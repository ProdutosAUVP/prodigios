# Animações e scroll

## Smooth scroll (Lenis)

`useLenis()` cria o Lenis e o pendura no ticker do GSAP (`gsap.ticker.add`), com `lagSmoothing(0)` — padrão recomendado pelos dois projetos para que o ScrollTrigger e o Lenis vejam o mesmo tempo. Cada evento de scroll chama `ScrollTrigger.update()`.

Âncoras internas (`a[href^="#"]`) são interceptadas e passam por `lenis.scrollTo(target, { offset: -72 })`.

Desligado com `prefers-reduced-motion`.

## Catálogo de interações

| Dobra | Técnica | Onde |
|---|---|---|
| Loader | uma única timeline GSAP, sem estado React: o olho AUVP abre, contador 0→100 (`onUpdate`), palavras trocam por `yPercent` num slot com `overflow: hidden`; `tl.call(finish)` libera a página **no instante em que as cortinas começam a abrir**, e o Hero (pré-escondido com `gsap.set` no mount) entra junto com a revelação. Fallback de 6 s libera a página se algo travar | `Loader.tsx`, `Hero.tsx` |
| Hero | estado inicial escondido via `gsap.set` (linhas, textos, fotos, badge) e entrada com `.to` quando `ready` vira `true`; linhas do título em máscara (`.line-mask`) sobem com `expo.out`; fotos entram com rotação aleatória; badge com `back.out`; parallax por `data-depth` (scrub) | `Hero.tsx` |
| Intro | palavras `opacity 0.12 → 1` com `scrub: 0.4` | `Intro.tsx` |
| Process | seção **pinada** (`pin: true`), track translada `-(scrollWidth - innerWidth)` com `scrub: 0.8`; cada card monta via `containerAnimation`; linha de progresso `scaleX`. Abaixo de 900px (`gsap.matchMedia`) vira lista vertical | `Process.tsx` |
| Trails | cards entram com `elastic.out(1, 0.7)` e rotação por índice; tilt em perspectiva no `mousemove` (`rotateX/Y` + `transformPerspective`); brilho radial segue o mouse via `--mx/--my` | `Trails.tsx` |
| NotRequired | linha sobe; risco cresce por `backgroundSize` (`.strike`, respeita quebra de linha); carimbo com `back.out(2.5)` | `NotRequired.tsx` |
| Culture | foto sticky com parallax `yPercent -12 → 12`; manifesto palavra a palavra com scrub; pilares entram da esquerda | `Culture.tsx` |
| Benefits / Fit / CTA | `useReveal()` — `data-reveal` em cascata | vários |
| Botões | `useMagnetic()` — `quickTo` segue o cursor, volta com `elastic.out` | `Button.tsx` |
| Nav | esconde ao rolar para baixo (> 400px), volta ao subir; vidro após 24px | `Nav.tsx` |

## Armadilhas conhecidas

**Transições CSS × `gsap.from()`.** Elementos com `transition` no `transform`/`opacity` (hover elástico, carimbos) travam no estado inicial quando animados com `from()`: o GSAP lê o valor computado no meio da transição. Use `freezeTransitions(alvos)` antes do tween e passe o restaurador no `onComplete`. Já aplicado em `useReveal`, `Process`, `Trails`, `NotRequired`.

**Pin + altura.** O `Process` usa `invalidateOnRefresh` e `end` como função, então redimensionar recalcula o percurso. Se adicionar conteúdo acima dele que carrega tarde (fontes, imagens grandes), chame `ScrollTrigger.refresh()` depois.

**Loader × Hero.** O Hero não pode "nascer" visível: se as cortinas abrirem sobre o título já montado e só depois o `from()` esconder e reanimar, o usuário vê um pulo. Por isso o estado inicial é definido com `gsap.set` num efeito de mount e a entrada usa `.to` com valores finais explícitos.

**StrictMode/HMR.** Toda animação vive em `gsap.context()` e é revertida no cleanup do efeito. Sem isso, ScrollTriggers duplicam.

## Fundo das dobras escuras

Não há WebGL. O fundo é o preto sólido da marca (`--ink`) com dois recursos em CSS: um halo radial verde (`radial-gradient` em `hsl(var(--forest) / 0.45)`, com `blur`) posicionado por dobra, e o grão (`.grain`, SVG `feTurbulence` inline em `mix-blend-mode: overlay` a 6%). Os dois são estáticos e não reagem ao mouse — o único movimento de fundo é o parallax das fotos do Hero, controlado pelo scroll.
