# CLAUDE.md — AUVP Prodígios (landing page)

Guia rápido para IAs e novos contribuidores. Leia antes de mexer no código.

## O que é

Landing page única (sem rotas) do programa AUVP Prodígios. Vite + React 18 + TypeScript + Tailwind, com Lenis + GSAP ScrollTrigger para o scroll e Three.js/R3F para a cena 3D de fundo. Publicada no GitHub Pages em `/prodigios/`.

## Entry points

| Arquivo | Papel |
|---|---|
| `src/App.tsx` | ordem das dobras + estado `ready` (pós-loader) |
| `src/data/content.ts` | **toda** a copy da página |
| `src/styles/tokens.css` | tokens do DS AUVP + extensões da LP |
| `src/lib/gsap.ts` | registro do GSAP, easings, `freezeTransitions()` |
| `vite.config.ts` | base path e chunks |

## Regras

- Texto só em `src/data/content.ts`. Fotos só em `src/data/photos.ts` via `<Photo>`.
- Importar `gsap`/`ScrollTrigger` de `@/lib/gsap`. Animações dentro de `gsap.context()` em `useLayoutEffect`, revertidas no cleanup.
- `gsap.from()` em elemento com `transition` CSS → envolver com `freezeTransitions()` (ver `docs/ANIMACOES.md`).
- Usar `rotation`, não `rotate`, nos tweens.
- Toda animação JS recebe `reducedMotion` e desliga quando `true`.
- Dobras claras: `data-scene-off` + `tone="light"`. Dobras escuras: `bg-ink/8x` para o 3D transparecer.
- Cores novas: HSL sem `hsl()` em `tokens.css`, expostas no `tailwind.config.ts`. Não substituir tokens do DS onde o DS já responde — extensões vão no bloco "LP extensions".
- Após `npm run build`, `dist/index.html` não pode ter `modulepreload` do chunk `three`.

## Comandos

`npm run dev` · `npm run build` · `npm run preview` · `npm run lint` · `npm run typecheck` · `npm run tokens:sync`

## Documentação

`README.md` (visão geral) · `docs/ARQUITETURA.md` · `docs/DESIGN-SYSTEM.md` · `docs/ANIMACOES.md` · `docs/DEPLOY.md` · `docs/CONTEUDO.md` · `docs/briefing-original.md`
