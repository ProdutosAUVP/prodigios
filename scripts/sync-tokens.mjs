#!/usr/bin/env node
/**
 * Sincroniza os tokens do Design System AUVP (ProdutosAUVP/central) com esta LP.
 *
 * Baixa src/index.css do repositório central, extrai os blocos :root e .dark
 * (marca Capital) e os grava em design-system/central-tokens.css para
 * conferência. Também baixa docs/figma/design-tokens.json (índice legível
 * por máquina).
 *
 * src/styles/tokens.css NÃO é sobrescrito automaticamente: ele contém as
 * extensões da LP. Compare com `git diff`/diff visual e porte o que mudou.
 *
 * Uso: npm run tokens:sync
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const RAW = "https://raw.githubusercontent.com/ProdutosAUVP/central/main";
const OUT = path.resolve("design-system");

function extractBlock(css, selector) {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(start, i + 1);
    }
  }
  return null;
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.text();
}

const css = await fetchText(`${RAW}/src/index.css`);
const root = extractBlock(css, ":root");
const dark = extractBlock(css, ".dark");
if (!root || !dark) throw new Error("Não encontrei os blocos :root/.dark em src/index.css do central.");

await mkdir(OUT, { recursive: true });
const header = `/* Gerado por scripts/sync-tokens.mjs em ${new Date().toISOString()}\n   Fonte: ${RAW}/src/index.css (marca Capital: :root + .dark)\n   Não edite à mão — porte as mudanças para src/styles/tokens.css. */\n\n`;
await writeFile(path.join(OUT, "central-tokens.css"), header + root + "\n\n" + dark + "\n");

try {
  const json = await fetchText(`${RAW}/docs/figma/design-tokens.json`);
  await writeFile(path.join(OUT, "design-tokens.json"), json);
} catch (e) {
  console.warn("Aviso: não consegui baixar design-tokens.json:", e.message);
}

console.log("Tokens do central salvos em design-system/. Compare com src/styles/tokens.css.");
