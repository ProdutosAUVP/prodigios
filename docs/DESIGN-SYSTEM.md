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

### Símbolo — Olho AUVP

O olho é o símbolo oficial da marca (`public/olho-preto.svg`, `olho-branco.svg`, `olho-amarelo.svg` no central; página **Marca & Logos** do DS). Aqui ele vive em `src/components/Eye.tsx` como SVG inline com `fill="currentColor"`: branco na navegação e no loader (fundo escuro), preto/verde em fundo claro. O dourado fica reservado à AUVP Escola. Também é o favicon (`public/favicon.svg`).

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
| `--graphite` | `0 0% 10%` | cinza escuro das dobras e superfícies que se destacam do preto (Intro, coluna "Aprender", cortinas do loader) |
| `--mist` | `0 0% 95%` | cinza das dobras claras (o `#F2F2F2` do DS) |
| `--lime` | `84 92% 62%` | acento elétrico exclusivo da LP: só botões de CTA, check de sucesso, seleção e foco |
| `--forest`, `--mint` | verdes do DS | definidos por compatibilidade, **não usados** na LP |
| `text-display-*` | `clamp()` de 2rem a 9rem, leading 0.92–1.05, tracking negativo | escala display que o DS não tem (para no `text-5xl`) |
| `--ease-elastic`, `--ease-expo` | `cubic-bezier(0.34, 1.56, 0.64, 1)`, `cubic-bezier(0.16, 1, 0.3, 1)` | hovers elásticos e reveals |
| `.glass`, `.grain`, `.clip-*`, `.text-gradient-brand`, `.stroke-text`, `.strike` | — | vidro, grão, recortes de foto, texto gradiente/outline, risco progressivo |
| `.card-elastic`, `.btn-lime`, `.btn-ghost` | — | variantes de hover e botão para as dobras escuras |

Critério: **a extensão nunca substitui um token do DS onde o DS já responde** — com uma exceção deliberada: a LP não usa o verde-escuro do DS em lugar nenhum (decisão de 09/2026, ver "Uso pontual de cor"), então `--foreground`, `--muted-foreground` e `--border` são sobrescritos com neutros no bloco "LP extensions".

### Padrões de espaçamento, curvatura e imagem

Três decisões valem para o site inteiro (tokens em `tokens.css`, classes em `globals.css`):

| Padrão | Regra | Token / classe |
|---|---|---|
| **Ritmo das dobras** | toda dobra usa o mesmo `padding-block`, que cresce com a viewport; o espaço entre o título da dobra e o conteúdo é sempre o mesmo | `--section-y: clamp(4.5rem, 6vw + 2rem, 8.5rem)` → `.section`; `--section-gap: clamp(2.5rem, 4vw + 1rem, 4.5rem)` → `.section-head`; `--stack: clamp(1.25rem, 2vw, 1.5rem)` para o gap entre cards |
| **Curvatura** | um raio só: 12px do DS (`--radius`) em cards, fotos, formulário e caixas de vidro; 5px em botões (DS); pílula em chips e carimbo. A única exceção é a **forma-assinatura** — o arco (`.clip-arch`) — usada com parcimônia: a foto grande do Hero e a foto da Inscrição | `rounded-lg`, `.photo`, `.clip-arch`, `rounded-btn`, `rounded-full` |
| **Tratamento de imagem** | toda foto passa por `<Photo>`: `object-cover`, dessaturação leve (`saturate 0.85`, `contrast 1.03`), véu neutro (`--ink` a 20%), degradê inferior para o preto e fade-in no carregamento; fallback em gradiente de cinza. Sem recortes irregulares (blob, diagonal). A foto-âncora do Hero ganha ainda o **meio-tom** (`.halftone-edge`): a base dissolve numa trama de pontos da cor do fundo, referência à linguagem de matriz de pontos | `src/components/Photo.tsx`, `globals.css` |

**Texturas de fundo** (só em dobra escura, sempre estáticas): `.grain` (ruído SVG a 6%), `.dots` (grade de pontos de 26px em papel a 16%, mascarada em elipse — usada apenas no Hero) e halos radiais em papel a 6–7%.

### Uso pontual de cor

Regra da página (decisão de 09/2026): **preto, grafite e papel; sem verde escuro; lime em pontos raros.**

| Papel | Token | Onde |
|---|---|---|
| Fundo das dobras escuras | `--ink` (`0 0% 4%`) | Hero, Trilhas, Cultura, coluna "Não é" do Fit, Inscrição, rodapé |
| Dobras e superfícies que precisam se destacar do preto | `--graphite` (`0 0% 10%`) | Intro, coluna "Aprender" do Fit, cortinas do loader; cards sobre preto usam `--card-on-preta` (`0 0% 11%`, do DS) |
| Dobras claras | `#FFF` e `--mist` (`0 0% 95%`, o `#F2F2F2` do DS) | Processo, Sem barreiras, Benefícios |
| Texto e ícones em dobra clara | `--ink` (títulos, ícones, linhas de progresso, carimbo) e `--muted-foreground` neutro | — |
| Texto em dobra escura | `--paper` cheio para ênfase, `paper/55–70` para o resto | ênfase é opacidade, nunca cor |
| **Lime** | `--lime` | **só** nos botões de CTA (navegação, Hero, envio do formulário), no check de sucesso do formulário, no ponto final das palavras do loader e em destaques pontuais (as quatro palavras-chave da declaração da Intro e os números 1-2-3 da lista "O que você vai aprender") |

O que **não** entra: o verde-escuro do DS (`--primary`/`--forest`, `#023619`) e o mint (`#5A8770`) — ficam definidos em `tokens.css` por compatibilidade, mas nenhuma classe da LP os usa. Halos de fundo são papel a 6–7% (cinza), o véu das fotos é `--ink` (neutro) e os fallbacks das fotos são gradientes de cinza. Por isso `--foreground`, `--muted-foreground` e `--border` são sobrescritos no bloco "LP extensions" com valores neutros: o DS usa um verde-escuro `110 78% 9%` como texto padrão, e aqui a regra é preto.

A última linha do título do Hero esmaece em **papel** (`.text-fade`, referência NG.CASH), não em lime; o adesivo circular é papel; a Intro é grafite.

## Sincronizando com o central

```bash
npm run tokens:sync
git diff design-system/
```

O script baixa `src/index.css` e `design-tokens.json` do central e grava em `design-system/`. `src/styles/tokens.css` **não** é sobrescrito (tem as extensões); porte manualmente o que mudou.
