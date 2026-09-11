import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, freezeTransitions } from "@/lib/gsap";
import { process } from "@/data/content";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

/**
 * Fases do processo seletivo, em leitura vertical (sem scroll lateral):
 *
 *  - Desktop: painel fixo à esquerda (título, número grande da fase ativa,
 *    "Fase N de 5" e barra de progresso) + lista das cinco fases à direita.
 *    A frase de fechamento saiu (a diretoria apontou repetição com o lead).
 *  - Mobile: título, depois a lista.
 *
 * A fase "ativa" é a que cruza o meio da viewport: um ScrollTrigger por
 * fase liga/desliga a classe `is-active` (a linha acende, as outras
 * esmaecem) e atualiza número e progresso do painel — sem estado React.
 */
export function Process({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<HTMLElement>(null);
  const header = useReveal<HTMLDivElement>({ disabled: reducedMotion });
  const total = process.steps.length;

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-step]");
      const big = root.current!.querySelector<HTMLElement>("[data-big]");
      const count = root.current!.querySelector<HTMLElement>("[data-count]");
      const bar = root.current!.querySelector<HTMLElement>("[data-bar]");

      const activate = (i: number) => {
        rows.forEach((r, k) => r.classList.toggle("is-active", k === i));
        if (big) big.textContent = process.steps[i].n;
        if (count) count.textContent = String(i + 1);
        if (bar) bar.style.transform = `scaleX(${(i + 1) / total})`;
      };
      activate(0);

      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
        });
        if (reducedMotion) return;
        const restore = freezeTransitions(row);
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          onComplete: restore,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion, total]);

  return (
    <section ref={root} id="processo" className="section relative bg-mist text-ink">
      <div className="wrap-wide grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Painel: fixo no desktop enquanto a lista rola */}
        <div className="lg:col-span-5">
          <div ref={header} className="lg:sticky lg:top-28">
            <SectionHeader tone="light" title={process.title} subtitle={process.lead} />

            <div data-reveal className="mt-10 hidden items-end gap-6 lg:flex">
              <span data-big className="font-anek text-[7rem] font-extrabold leading-[0.85] tracking-tight text-ink" aria-hidden>
                01
              </span>
              <div className="mb-2 flex-1">
                <p className="label text-muted-foreground">
                  Fase <span data-count>1</span> de {total}
                </p>
                <div className="mt-3 h-px w-full bg-border">
                  <div data-bar className="h-full origin-left bg-ink transition-transform duration-600 ease-expo" style={{ transform: `scaleX(${1 / total})` }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Lista de fases */}
        <ol className="lg:col-span-7">
          {process.steps.map((s, i) => (
            <li
              key={s.n}
              data-step
              className="step group relative grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/10 py-7 last:border-b sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-9"
            >
              <span className="step-n font-anek text-3xl font-extrabold leading-none tabular-nums text-ink/25 sm:text-4xl" aria-hidden>
                {s.n}
              </span>
              <div>
                <h3 className="font-anek text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  <span className="sr-only">Fase {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="step-text mt-2 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{s.text}</p>
              </div>
              <span aria-hidden className="step-bar absolute -left-6 top-0 h-full w-[3px] origin-top scale-y-0 bg-lime sm:-left-8" />
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
