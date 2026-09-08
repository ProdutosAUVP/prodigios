# Arquitetura

## Visão geral

SPA de página única em React 18 + TypeScript, empacotada pelo Vite. Não há roteador: a navegação é por âncoras (`#processo`, `#trilhas`, …) que passam pelo Lenis para rolar suavemente com offset da barra fixa.

```
main.tsx
└── App.tsx
    ├── Loader            (fixed, z-100)   → onDone() libera o resto
    ├── Scene             (fixed, z-0)     → canvas 3D, lazy, atrás de tudo
    ├── Nav               (fixed, z-50)
    ├── <main z-10>
    │   ├── Hero · Intro · Process · Trails · NotRequired
    │   └── Culture · Benefits · Fit · CTA
    └── Footer
```

### Camadas (z-index)

| z | Elemento | Observação |
|---|---|---|
| 100 | `Loader` | some após a animação (autoAlpha 0) |
| 50 | `Nav` | vidro escuro após rolar; esconde ao descer, volta ao subir |
| 10 | `<main>` | dobras escuras usam `bg-ink/80–85` para a cena 3D transparecer; dobras claras são opacas e levam `data-scene-off` |
| 0 | `Scene` | `pointer-events: none` |

## Estado compartilhado sem React

`src/lib/scroll-progress.ts` exporta um objeto mutável `scrollState` (`progress`, `velocity`, `mouseX/Y`). O Lenis escreve `progress` em cada evento de scroll e `useMouseParallax` escreve o mouse; a cena 3D lê os valores dentro de `useFrame`. Nada disso passa por `setState`, então scroll e mouse não provocam re-render.

## Ciclo de vida do carregamento

1. `Loader` monta com `overflow-hidden` no `<html>` e anima o contador (GSAP timeline).
2. Ao terminar chama `onDone()` → `ready = true` em `App`.
3. `Hero` observa `ready` e dispara a timeline de entrada (linhas do título, fotos, badge).
4. `Nav` desliza para dentro.
5. `Scene` só monta com `ready && !reducedMotion`, e ainda espera `requestIdleCallback` para não competir com a animação do Hero. O import de Three.js/R3F acontece nesse momento.

Com `prefers-reduced-motion`, o `Loader` chama `onDone()` imediatamente e não renderiza nada; Lenis e cena 3D não são criados.

## Componentes de dobra

Cada dobra é um componente autocontido em `src/components/<Nome>.tsx` que:

- lê seu texto de `src/data/content.ts` (nunca hardcoded no JSX);
- recebe `reducedMotion` por prop e desliga o que for JS;
- cria suas animações dentro de `gsap.context()` em `useLayoutEffect` e reverte no cleanup (`ctx.revert()`), para não vazar ScrollTriggers em HMR ou StrictMode.

`useReveal()` é o atalho para o padrão mais comum: qualquer descendente com `data-reveal` sobe e aparece em cascata quando a dobra entra na viewport; palavras marcadas por `splitWords()` (`data-word`) sobem de dentro da máscara.

## Convenções

- **Imports de GSAP** sempre de `@/lib/gsap` (registra o plugin uma vez e centraliza defaults/easings).
- **`freezeTransitions()`** antes de qualquer `gsap.from()` em elemento que tenha `transition` CSS no `transform`/`opacity` (cards com hover elástico, carimbos). Sem isso o GSAP lê o valor computado no meio da transição e o elemento trava no estado inicial. A função devolve o restaurador — passe no `onComplete`.
- **`rotation`**, não `rotate`, nos tweens (nome canônico do GSAP).
- **Cores em HSL sem `hsl()`** nas variáveis, como no DS, para permitir `hsl(var(--x) / 0.5)`.
- **Dobras claras** levam `data-scene-off` (pausa o render 3D) e usam `tone="light"` no `SectionHeader`.
- **Fotos** sempre via `<Photo>` (fallback em gradiente, sobreposição da marca, lazy).
- **Botões** sempre via `<Button>` (Sora Bold caixa alta, radius 5px, magnético).

## Build

`vite.config.ts` separa chunks por função (`manualChunks`):

| Chunk | Conteúdo | Carregamento |
|---|---|---|
| `index` | app | imediato |
| `react` | react, react-dom, scheduler | imediato (modulepreload) |
| `motion` | gsap, lenis | imediato (modulepreload) |
| `three` | three, @react-three/fiber | **lazy** — só quando `SceneCanvas` é importado |
| `SceneCanvas` | a cena em si | lazy |

Verifique após um build que `dist/index.html` **não** tem `modulepreload` para o chunk `three`: se aparecer, algum import estático passou a puxar Three.js para o caminho crítico.
