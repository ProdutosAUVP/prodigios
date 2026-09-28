/**
 * Gera os e-mails transacionais do AUVP Carreiras em emails/html/:
 * um .html (tabelas + CSS inline, compatível com Gmail/Outlook) e um .txt
 * (versão texto) por e-mail, além de emails/html/index.html para revisão.
 *
 *   npm run emails:build
 *   EMAIL_SITE_URL=https://carreiras.auvp.com.br/ npm run emails:build
 *
 * Variáveis {{assim}} ficam no arquivo para a ferramenta de disparo substituir.
 * Estética da LP: ink/grafite/papel; lime só no botão e no check de sucesso.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { emails } from "./emails.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "html");
const SITE = (process.env.EMAIL_SITE_URL || "https://produtosauvp.github.io/prodigios/").replace(/\/?$/, "/");

// Tokens da LP convertidos de HSL (src/styles/tokens.css) para hex
const C = {
  ink: "#0a0a0a",
  graphite: "#1a1a1a",
  line: "#2b2b2b",
  paper: "#fbfaf9",
  paper80: "#cfcecd",
  paper60: "#9c9b9a",
  paper45: "#767574",
  lime: "#b0f745",
  limeFg: "#0b2905",
};
const F = {
  display: "'Anek Latin', Arial, Helvetica, sans-serif",
  body: "Roboto, Arial, Helvetica, sans-serif",
  ui: "Sora, Arial, Helvetica, sans-serif",
};

const LINKS = {
  site: SITE,
  privacy: `${SITE}privacidade`,
  terms: `${SITE}termos`,
  dpo: "dpo@auvp.com.br",
};

const esc = (s) => s.replace(/&(?!#?\w+;)/g, "&amp;");
const strip = (s) => s.replace(/<br\s*\/?>/g, "\n").replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, "$2 ($1)").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const link = (href, label, color = C.paper) => `<a href="${href}" style="color:${color};text-decoration:underline;">${label}</a>`;
const dpoLink = (color) => link(`mailto:${LINKS.dpo}`, LINKS.dpo, color);

/* ---------------------------------------------------------------- blocos */

const blocks = {
  check: () => ({
    html: `<tr><td style="padding:0 0 28px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="56" height="56" align="center" valign="middle" bgcolor="${C.lime}" style="width:56px;height:56px;border-radius:28px;background:${C.lime};color:${C.limeFg};font-family:Arial,sans-serif;font-size:28px;font-weight:700;line-height:56px;">&#10003;</td></tr></table></td></tr>`,
    text: "",
  }),
  kicker: (t) => ({
    html: `<tr><td style="padding:0 0 12px;font-family:${F.body};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.paper45};">${t}</td></tr>`,
    text: t.toUpperCase(),
  }),
  title: (t) => ({
    html: `<tr><td class="h1" style="padding:0 0 20px;font-family:${F.display};font-size:36px;line-height:38px;font-weight:700;letter-spacing:-0.5px;color:${C.paper};">${t}</td></tr>`,
    text: `${strip(t)}\n${"=".repeat(Math.min(strip(t).length, 60))}`,
  }),
  p: (t) => ({
    html: `<tr><td style="padding:0 0 16px;font-family:${F.body};font-size:16px;line-height:26px;color:${C.paper80};">${t}</td></tr>`,
    text: strip(t),
  }),
  /** caixa de detalhes: [["Data", "{{data}}"], ...] */
  box: (rows, heading) => ({
    html: `<tr><td style="padding:8px 0 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line};border-radius:8px;background:${C.ink};" bgcolor="${C.ink}">${
      heading ? `<tr><td colspan="2" style="padding:18px 20px 4px;font-family:${F.body};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.paper45};">${heading}</td></tr>` : ""
    }${rows
      .map(
        ([k, v], i) =>
          `<tr><td valign="top" style="padding:${i === 0 && !heading ? 18 : 10}px 12px ${i === rows.length - 1 ? 18 : 10}px 20px;width:38%;font-family:${F.body};font-size:14px;line-height:20px;color:${C.paper60};${i ? `border-top:1px solid ${C.line};` : ""}">${k}</td><td valign="top" style="padding:${i === 0 && !heading ? 18 : 10}px 20px ${i === rows.length - 1 ? 18 : 10}px 0;font-family:${F.body};font-size:14px;line-height:20px;font-weight:500;color:${C.paper};${i ? `border-top:1px solid ${C.line};` : ""}">${v}</td></tr>`,
      )
      .join("")}</table></td></tr>`,
    text: `${heading ? `${heading}\n` : ""}${rows.map(([k, v]) => `- ${k}: ${strip(v)}`).join("\n")}`,
  }),
  /** passos numerados, como a lista de fases da LP */
  steps: (items) => ({
    html: `<tr><td style="padding:4px 0 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items
      .map(
        (t, i) =>
          `<tr><td valign="top" width="44" style="padding:0 0 14px;font-family:${F.display};font-size:22px;line-height:24px;font-weight:700;color:${C.paper45};">${String(i + 1).padStart(2, "0")}</td><td valign="top" style="padding:1px 0 14px;font-family:${F.body};font-size:15px;line-height:23px;color:${C.paper80};">${t}</td></tr>`,
      )
      .join("")}</table></td></tr>`,
    text: items.map((t, i) => `${String(i + 1).padStart(2, "0")}. ${strip(t)}`).join("\n"),
  }),
  /** botão "à prova de Outlook": célula com bgcolor + link com padding */
  button: (label, href) => ({
    html: `<tr><td style="padding:12px 0 28px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${C.lime}" style="border-radius:5px;background:${C.lime};"><a href="${href}" target="_blank" class="btn" style="display:inline-block;padding:16px 32px;font-family:${F.ui};font-size:13px;line-height:16px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.limeFg};text-decoration:none;border-radius:5px;">${label}&nbsp;&nbsp;&rarr;</a></td></tr></table></td></tr>`,
    text: `${label}: ${href}`,
  }),
  note: (t) => ({
    html: `<tr><td style="padding:4px 0 12px;font-family:${F.body};font-size:13px;line-height:20px;color:${C.paper60};">${t}</td></tr>`,
    text: strip(t),
  }),
  divider: () => ({
    html: `<tr><td style="padding:12px 0 24px;"><div style="height:1px;line-height:1px;font-size:1px;background:${C.line};">&nbsp;</div></td></tr>`,
    text: "---",
  }),
  sign: () => ({
    html: `<tr><td style="padding:8px 0 0;font-family:${F.body};font-size:15px;line-height:24px;color:${C.paper80};">Até breve,<br /><strong style="color:${C.paper};">Time AUVP Carreiras</strong></td></tr>`,
    text: "Até breve,\nTime AUVP Carreiras",
  }),
};

/* ---------------------------------------------------------------- layout */

function render(email) {
  const parts = email.body(blocks, { LINKS, link, dpoLink, C });
  const rows = parts.map((b) => b.html).join("\n");
  const reason = email.reason ?? "Você recebeu este e-mail porque se inscreveu no AUVP Carreiras.";

  const html = `<!doctype html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>${esc(email.subject)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@400;700&family=Roboto:wght@400;500;700&family=Sora:wght@700&display=swap" rel="stylesheet" />
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  body { margin: 0 !important; padding: 0 !important; width: 100% !important; background: ${C.ink}; }
  a { color: ${C.paper}; }
  .btn:hover { opacity: 0.88; }
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .pad { padding-left: 24px !important; padding-right: 24px !important; }
    .card { padding: 32px 24px !important; }
    .h1 { font-size: 30px !important; line-height: 32px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.ink};" bgcolor="${C.ink}">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.ink};opacity:0;">${email.preheader}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ink}" style="background:${C.ink};">
<tr><td align="center" style="padding:32px 12px;">
  <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
  <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
    <tr><td class="pad" style="padding:8px 8px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${F.display};font-size:22px;line-height:24px;font-weight:700;letter-spacing:-0.3px;color:${C.paper};">
          <a href="${LINKS.site}" style="color:${C.paper};text-decoration:none;">AUVP <span style="font-weight:400;color:${C.paper60};">Carreiras</span></a>
        </td>
        <td align="right" style="font-family:${F.body};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.paper45};">${email.tag ?? "Desafio de Potencial"}</td>
      </tr></table>
    </td></tr>

    <tr><td bgcolor="${C.graphite}" class="card" style="background:${C.graphite};border:1px solid ${C.line};border-radius:12px;padding:44px 40px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${rows}
      </table>
    </td></tr>

    <tr><td class="pad" style="padding:28px 8px 0;font-family:${F.body};font-size:12px;line-height:19px;color:${C.paper45};">
      <p style="margin:0 0 10px;">${reason} Este é um e-mail sobre a sua participação: não enviamos ofertas nem publicidade para este endereço.</p>
      <p style="margin:0 0 10px;">Quer ver, corrigir ou apagar seus dados, desistir ou pedir a revisão de uma decisão? Escreva para ${dpoLink(C.paper60)}.</p>
      <p style="margin:0 0 18px;">${link(LINKS.privacy, "Aviso de Privacidade", C.paper60)} &nbsp;·&nbsp; ${link(LINKS.terms, "Termos de Participação", C.paper60)}</p>
      <p style="margin:0;color:${C.paper45};">HOLDING SUPERNOVA LTDA (grupo AUVP) · CNPJ 51.197.828/0001-12</p>
    </td></tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>
`;

  const text = [
    "AUVP Carreiras",
    "",
    ...parts.map((b) => b.text).filter(Boolean).flatMap((t) => [t, ""]),
    "--",
    `${reason} Este é um e-mail sobre a sua participação: não enviamos ofertas nem publicidade para este endereço.`,
    `Seus dados e direitos: ${LINKS.dpo}`,
    `Aviso de Privacidade: ${LINKS.privacy}`,
    `Termos de Participação: ${LINKS.terms}`,
    "HOLDING SUPERNOVA LTDA (grupo AUVP) · CNPJ 51.197.828/0001-12",
    "",
  ].join("\n");

  return { html, text };
}

/* ---------------------------------------------------------------- saída */

mkdirSync(OUT, { recursive: true });
for (const e of emails) {
  const { html, text } = render(e);
  writeFileSync(join(OUT, `${e.file}.html`), html);
  writeFileSync(join(OUT, `${e.file}.txt`), text);
}

// Galeria para revisão (abre cada e-mail num iframe, com assunto e gatilho)
const gallery = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>E-mails transacionais — AUVP Carreiras</title>
<link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body{margin:0;background:#f2f2f2;color:#0a0a0a;font-family:Roboto,Arial,sans-serif}
  header{background:#0a0a0a;color:#fbfaf9;padding:40px 24px}
  header h1{font-family:'Anek Latin',Arial,sans-serif;font-size:40px;margin:0 0 8px}
  header p{margin:0;opacity:.7}
  main{max-width:1400px;margin:0 auto;padding:32px 24px;display:grid;gap:32px;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))}
  article{background:#fff;border:1px solid #ddd;border-radius:12px;overflow:hidden}
  .meta{padding:20px}
  .meta b{font-family:'Anek Latin',Arial,sans-serif;font-size:22px;display:block;margin-bottom:6px}
  .meta span{display:block;font-size:13px;color:#666;margin-top:4px}
  .meta a{color:#0a0a0a}
  iframe{display:block;width:100%;height:720px;border:0;border-top:1px solid #ddd;background:#0a0a0a}
</style></head><body>
<header><h1>E-mails transacionais</h1><p>AUVP Carreiras · Desafio de Potencial · ${emails.length} modelos · gerado por emails/build.mjs</p></header>
<main>
${emails
  .map(
    (e) => `<article><div class="meta"><b>${e.file}</b>
<span><strong>Assunto:</strong> ${esc(e.subject)}</span>
<span><strong>Pré-cabeçalho:</strong> ${esc(e.preheader)}</span>
<span><strong>Quando:</strong> ${esc(e.trigger)}</span>
<span><a href="${e.file}.html" target="_blank">abrir HTML</a> · <a href="${e.file}.txt" target="_blank">versão texto</a></span></div>
<iframe src="${e.file}.html" title="${esc(e.subject)}" loading="lazy"></iframe></article>`,
  )
  .join("\n")}
</main></body></html>
`;
writeFileSync(join(OUT, "index.html"), gallery);

console.log(`${emails.length} e-mails gerados em ${OUT} (site: ${SITE})`);
