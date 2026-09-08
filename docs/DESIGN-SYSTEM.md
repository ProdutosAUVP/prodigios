# Design System AUVP — base e extensões

A página usa o Design System da AUVP ([ProdutosAUVP/central](https://github.com/ProdutosAUVP/central)) como **fundação**, não como teto: tokens, tipografia, botões, cards e motion vêm do DS; escala display, paleta de acento, vidro, grão e easings elásticos são extensões próprias da landing.

## O que foi extraído do repositório central

Fonte: `src/index.css` (blocos `:root` e `.dark` da marca **AUVP Capital**) e `docs/figma/design-tokens.json`. Snapshot em [`design-system/`](../design-system/); regerar com `npm run tokens:sync`.

### Tipografia

| Papel | Fonte | Uso no DS | Token |
|---|---|---|---|
| Títulos | **Anek Latin** 400–800 | `font-anek` | `--font-display` |
| Corpo, labels, legendas | **Roboto** 300–700 | `font-roboto` | `--font-body` |
| Botões (exclusiva) | **Sora** 600–700 | `font-sora` | `--font-ui` |

Escala do DS: H1 `text-3xl md:text-5xl` bold · H2 `text-2xl md:text-3xl` · corpo 16px · texto pequeno 14px · **label** Roboto Bold 12px uppercase tracking wide · **botão** Sora Bold 13px uppercase.

### Cores (Capital)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--primary` / `--brand` / `--cta` | `155 93% 11%` (#023619) | `0 0% 98%` | verde AUVP; CTA sempre verde nas LPs |
| `--foreground` | `110 78% 9%` | `0 0% 98%` | texto |
| `--muted` / `--muted-foreground` | `120 10% 95%` / `110 10% 40%` | `0 0% 10%` / `0 0% 70%` | fundos e textos secundários |
| `--accent` (dark) | — | `145 20% 44%` (#5A8770) | verde de acento pontual no escuro |
| `--border` | `120 10% 88%` | `0 0% 16%` | bordas |
| `--radius` | `0.75rem` | | cards: 12px sempre |

### Regras visuais do DS aplicadas

- **Botões**: Sora Bold, caixa alta, `border-radius: 5px`, hover "vazado" (fundo some, borda aparece). Invertido em dobra escura: fundo `#fafafa`, hover `#e0e0e0`. → `.btn`, `.btn-cta`, `.btn-inverted`.
- **Cards**: radius 12px; hover oficial `translateY(-2px)` + `0 8px 24px rgba(0,0,0,0.06)` em 240ms. → `.card`.
- **Dobras institucionais**: alternam `#FFF → #F2F2F2 → #000`; card sobre preta é `#1B1B1B`. → `--dobra-*`, `--card-on-preta`; ordem das seções em `App.tsx`.
- **Layout**: container 1200px, padding inline 24px, ritmo em múltiplos de 15px. → `.wrap`, `--container-*`, `--rhythm`.
- **Motion**: 150ms micro / 240ms padrão / 320ms LP; `ease` e overshoot `cubic-bezier(0.175, 0.885, 0.32, 1.275)`. `prefers-reduced-motion` neutraliza animações CSS globalmente e as de JS checam `useReducedMotion`. → `--dur-*`, `--ease-*`.
- **Contraste**: tokens `*-emphasis` para cor de marca como texto sobre fundo claro.

## Extensões da landing (fora do DS)

Estão marcadas no final de `src/styles/tokens.css` e em `tailwind.config.ts`:

| Extensão | Valor | Motivo |
|---|---|---|
| `--ink` | `0 0% 4%` | preto quase absoluto das dobras imersivas (o DS usa `0 0% 0%`; o 4% dá profundidade ao vidro e ao grão) |
| `--paper` | `40 20% 98%` | branco quente para texto sobre preto |
| `--mist` | `120 8% 94%` | cinza-esverdeado das dobras claras (equivalente ao `#F2F2F2` do DS com um toque da marca) |
| `--mint` | `145 20% 44%` | alias do verde de acento dark do DS para usar em qualquer tema |
| `--lime` | `84 92% 62%` | acento elétrico exclusivo da LP: CTAs em dobra escura, marcadores, seleção |
| `text-display-*` | `clamp()` de 2rem a 9rem, leading 0.92–1.05, tracking negativo | escala display que o DS não tem (para no `text-5xl`) |
| `--ease-elastic`, `--ease-expo` | `cubic-bezier(0.34, 1.56, 0.64, 1)`, `cubic-bezier(0.16, 1, 0.3, 1)` | hovers elásticos e reveals |
| `.glass`, `.grain`, `.clip-*`, `.text-gradient-brand`, `.stroke-text`, `.strike` | — | vidro, grão, recortes de foto, texto gradiente/outline, risco progressivo |
| `.card-elastic`, `.btn-lime`, `.btn-ghost` | — | variantes de hover e botão para as dobras escuras |

Critério: **a extensão nunca substitui um token do DS onde o DS já responde**. O verde `#023619` continua sendo o CTA nas dobras claras; o lime só aparece sobre preto, onde o DS já prescreve "cor clara + texto quase-preto".

## Sincronizando com o central

```bash
npm run tokens:sync
git diff design-system/
```

O script baixa `src/index.css` e `design-tokens.json` do central e grava em `design-system/`. `src/styles/tokens.css` **não** é sobrescrito (tem as extensões); porte manualmente o que mudou.
