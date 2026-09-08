import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { intro } from "@/data/content";

/**
 * Declaração de abertura: palavra a palavra "acende" conforme o scroll
 * (scrub). Marquee da marca cruzando a dobra.
 */
export function Intro({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.12, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: "[data-statement]", start: "top 75%", end: "bottom 45%", scrub: 0.4 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  const words = intro.statement.split(" ");
  const emphasis = new Set(["garra", "aprender,", "alta", "performance."]);

  return (
    <section ref={root} className="section relative bg-ink/80">
      <div className="wrap">
        <h2 className="mb-8 max-w-4xl font-anek text-display-sm font-semibold text-paper/60">{intro.title}</h2>
        <p data-statement className="max-w-5xl font-anek text-display-md font-semibold leading-[1.08] text-paper">
          {words.map((w, i) => (
            <span key={i} data-w className={`mr-[0.28em] inline-block ${emphasis.has(w.toLowerCase()) ? "text-paper" : "text-paper/70"}`}>
              {w}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-[var(--section-gap)] overflow-hidden border-y border-paper/10 py-5" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-anek text-2xl font-bold uppercase tracking-tight text-paper/25 md:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              {["Tecnologia", "Growth & Marketing", "Negócios & Finanças", "Alta performance", "Sentimento de dono"].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
