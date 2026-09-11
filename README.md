# AUVP Future — Landing Page

Landing page do programa **AUVP Future**, "um programa para talentos fora da curva". Experiência imersiva e séria, com scroll interativo, loading screen e micro-interações elásticas — construída sobre os tokens do [Design System AUVP](https://github.com/ProdutosAUVP/central) e extrapolando-os onde a página pede.

Pronta para deploy no **GitHub Pages** (workflow incluído).

> Documentação completa em [`docs/`](docs/): [Arquitetura](docs/ARQUITETURA.md) · [Design System e extensões](docs/DESIGN-SYSTEM.md) · [Animações e 3D](docs/ANIMACOES.md) · [Deploy](docs/DEPLOY.md) · [Conteúdo](docs/CONTEUDO.md) · [Copy oficial 09/2026](docs/copy-oficial-2026-09.md) · [Briefing original](docs/briefing-original.md)

---

## Stack

| Camada | Tecnologia | Por quê |
|---|---|---|
| Build | [Vite 5](https://vitejs.dev) + TypeScript | Mesmo toolchain do repositório `central`; build rápido, chunks sob demanda |
| UI | React 18 | Componentização por dobra (`Hero`, `Process`, `Trails`, …) |
| Estilo | Tailwind CSS 3.4 + variáveis CSS (HSL) | Tokens idênticos aos do DS AUVP, expostos em `src/styles/tokens.css` |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) + [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Smooth scroll sincronizado ao ticker do GSAP; seções pinadas, scrub, reveals |
| Deploy | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml` |

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:8080/prodigios/
```

Outros scripts:

```bash
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve dist/ em http://127.0.0.1:4173/prodigios/
npm run lint       # ESLint
npm run typecheck  # tsc -b --noEmit
npm run tokens:sync  # baixa os tokens atuais do repositório central para design-system/
```

Requisitos: Node 20+.

## Variáveis de ambiente

Copie `.env.example` para `.env` (opcional — tudo tem padrão):

| Variável | Padrão | Uso |
|---|---|---|
| `VITE_BASE` | `/prodigios/` | Base path do build. Use `/` em domínio próprio |
| `VITE_FORM_ENDPOINT` | vazio | Endpoint que recebe o formulário de inscrição (Formspree, Getform, n8n…). Sem ele o formulário roda em **modo demonstração** |
| `VITE_APPLY_URL` | `#inscricao` | Link externo de inscrição (ATS, Gupy, Typeform). Se definido, os botões "Quero me inscrever" apontam para ele |

## Estrutura

```
.
├── .github/workflows/     deploy.yml (Pages) e ci.yml (lint/typecheck/build em PRs)
├── design-system/         snapshot dos tokens do repositório central (CSS + JSON)
├── docs/                  documentação
├── public/                favicon, 404.html (redirect para a base), robots.txt, og.png
├── scripts/sync-tokens.mjs
└── src/
    ├── components/        uma dobra por arquivo + UI compartilhada (Button, Photo, …)
    ├── data/              content.ts (copy oficial) e photos.ts (fotografia)
    ├── hooks/             useLenis, useReveal, useMagnetic, useReducedMotion
    ├── lib/               gsap.ts (registro + helpers), text.ts
    └── styles/            tokens.css (DS + extensões) e globals.css (base, componentes, utilitários)
```

## Dobras da página

| Ordem | Componente | Fundo (DS) | Destaque de interação |
|---|---|---|---|
| 0 | `Loader` | grafite | Olho AUVP abre, contador 0→100, palavras da cultura, cortinas abrem em sincronia com a entrada do Hero |
| 1 | `Hero` | preta | Editorial, mobile-first: título em 3 linhas (a última em papel cheio), subtítulo + ações, e composição fotográfica — foto grande em arco revelada por `clip-path` com Ken Burns e base em meio-tom, foto menor sobreposta, adesivos com os fatos, adesivo circular girando e selo de vidro; grade de pontos no fundo; marquee cinza fechando a dobra; parallax em duas profundidades |
| 2 | `About` | branca | "O que é a AUVP?": quatro credenciais em grade (60 mil+, Top 1, 4 frentes, Cultura) |
| 3 | `Intro` | grafite | "Isso não é um programa de estágio": declaração que "acende" palavra a palavra com o scroll |
| 4 | `Process` | cinza | Lista vertical das 5 fases com painel fixo (número grande, "Fase N de 5", progresso); a fase que cruza o meio da tela acende |
| 5 | `Trails` | preta | Cards que se montam com elasticidade e inclinam em perspectiva no hover |
| 6 | `NotRequired` | branca | Requisitos riscados ao vivo + carimbo "Opcional" |
| 7 | `Culture` | preta | Foto sticky com parallax e recorte; manifesto revela palavra a palavra |
| 8 | `Benefits` | cinza | Grade assimétrica com hover oficial do DS + ícones que pulam |
| 9 | `Fit` | grafite/preta | "O que você vai aprender" × "Para quem NÃO é" |
| 10 | `CTA` | preta | Título + texto e foto em arco preenchendo a altura do formulário (5/7 colunas); formulário de inscrição (nome, e-mail, trilha) |
| 11 | `Footer` | preta | — |

## Acessibilidade e performance

- `prefers-reduced-motion`: animações CSS neutralizadas globalmente (regra do DS); as de JS checam `useReducedMotion()` — sem loader, sem Lenis, conteúdo visível de imediato.
- Sem WebGL: o fundo das dobras escuras é o preto sólido da marca com halo e grão em CSS. Bundle inicial ≈ 110 KB gzip (React + GSAP/Lenis + app).
- Padrões únicos de espaçamento (`--section-y`, `--section-gap`, `--stack`), curvatura (12px do DS + arco como forma-assinatura) e tratamento de foto (`<Photo>`), documentados em `docs/DESIGN-SYSTEM.md`.
- Mobile-first: classes base para 360px, `sm`/`lg` só adicionam colunas. Título do Hero em 3 linhas curtas que cabem em 360px (`text-display-xl` = `clamp(2.75rem, 8.4vw, 8.5rem)`).
- Cor: preto, grafite e papel, sem verde escuro; lime só nos botões de CTA e no check do formulário (ver `docs/DESIGN-SYSTEM.md`).
- Fotos oficiais da AUVP (repositório `etica`) em WebP local, `loading="lazy"` (exceto o Hero) e fallback em gradiente da marca se a imagem não carregar.
- Navegação por teclado com `:focus-visible` em lime; formulário com labels e `aria-live` no loader.
- Contraste seguindo os tokens `*-emphasis` do DS nas dobras claras.

## Deploy

Push na `main` dispara o workflow que builda e publica em `https://<org>.github.io/prodigios/`. Antes do primeiro deploy, em **Settings → Pages**, escolha **Source: GitHub Actions**. Detalhes (domínio próprio, secrets do formulário) em [`docs/DEPLOY.md`](docs/DEPLOY.md).
