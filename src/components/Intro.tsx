import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { intro } from "@/data/content";

/**
 * Declaração de abertura em dobra lime inteira (única da página — referência
 * NG.CASH): palavra a palavra "acende" conforme o scroll (scrub).
 */
export function Intro({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.18, y: 6 },
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
    <section ref={root} className="section relative bg-lime text-lime-foreground">
      <div className="wrap">
        <h2 className="mb-8 max-w-4xl font-anek text-display-sm font-semibold text-ink/60">{intro.title}</h2>
        <p data-statement className="max-w-5xl font-anek text-display-md font-semibold leading-[1.08] text-ink">
          {words.map((w, i) => (
            <span key={i} data-w className={`mr-[0.28em] inline-block ${emphasis.has(w.toLowerCase()) ? "text-ink" : "text-ink/65"}`}>
              {w}
            </span>
          ))}
        </p>
      </div>

    </section>
  );
}
