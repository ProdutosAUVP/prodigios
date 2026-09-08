import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, freezeTransitions } from "@/lib/gsap";
import { process } from "@/data/content";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

/**
 * Fases do processo seletivo em scroll horizontal "pinado" (desktop).
 * No mobile (< 900px) as fases empilham verticalmente com reveal comum.
 * O progresso da trilha (linha) acompanha o scrub.
 */
export function Process({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const header = useReveal<HTMLDivElement>({ disabled: reducedMotion });

  useLayoutEffect(() => {
    if (!root.current || !track.current || reducedMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const t = track.current!;
      const getX = () => -(t.scrollWidth - window.innerWidth);

      const tween = gsap.to(t, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${t.scrollWidth - window.innerWidth + 200}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Cada card "monta" ao entrar na viewport horizontal
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((card) => {
        gsap.from(card.querySelectorAll("[data-step-part]"), {
          y: 60,
          opacity: 0,
          rotation: 2,
          stagger: 0.08,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%", once: true },
        });
      });

      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${t.scrollWidth - window.innerWidth + 200}`, scrub: true },
      });
    });

    mm.add("(max-width: 899px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((card) => {
        const restore = freezeTransitions(card);
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          onComplete: restore,
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [reducedMotion]);

  return (
    <section ref={root} id="processo" className="relative overflow-hidden bg-mist text-foreground">
      <div className="section flex flex-col justify-center min-[900px]:h-screen min-[900px]:py-0">
        <div ref={header} className="wrap-wide section-head flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader tone="light" title={process.title} />
          <div data-reveal className="hidden items-center gap-3 text-sm text-muted-foreground min-[900px]:flex">
            <span className="label">Role</span>
            <span className="relative h-px w-40 bg-border">
              <span data-progress className="absolute inset-0 origin-left scale-x-0 bg-primary" />
            </span>
            <span className="label">5 fases</span>
          </div>
        </div>

        <div ref={track} className="flex flex-col gap-[var(--stack)] px-6 min-[900px]:w-max min-[900px]:flex-row min-[900px]:gap-8 min-[900px]:pl-[max(24px,calc((100vw-1400px)/2+24px))] min-[900px]:pr-[10vw]">
          {process.steps.map((s, i) => (
            <article
              key={s.n}
              data-step
              className="card card-elastic group relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-white p-7 min-[900px]:w-[min(520px,42vw)] min-[900px]:min-h-[440px] min-[900px]:p-10"
            >
              <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/5 transition-transform duration-600 ease-expo group-hover:scale-[2.2]" />
              <div className="relative flex items-start justify-between">
                <span data-step-part className="font-anek text-7xl font-extrabold leading-none text-primary/15 transition-colors duration-320 group-hover:text-primary md:text-8xl">
                  {s.n}
                </span>
                <span data-step-part className="label rounded-full border border-border px-3 py-1 text-muted-foreground">
                  Fase {i + 1} de {process.steps.length}
                </span>
              </div>
              <div className="relative">
                <h3 data-step-part className="font-anek text-display-sm font-bold text-foreground">
                  {s.title}
                </h3>
                <p data-step-part className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
                  {s.text}
                </p>
              </div>
              <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-600 ease-expo group-hover:scale-x-100" />
            </article>
          ))}

          <div data-step className="flex items-center min-[900px]:w-[38vw]">
            <p className="font-anek text-display-md font-bold text-foreground">
              Do <span className="text-primary">clique</span> ao <span className="text-primary">contrato</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
