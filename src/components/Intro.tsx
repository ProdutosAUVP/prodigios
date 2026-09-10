import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { intro } from "@/data/content";

/**
 * Declaração de abertura em dobra grafite (contraste com o preto do Hero):
 * palavra a palavra "acende" conforme o scroll (scrub); as palavras de
 * destaque só viram lime quando a frase inteira está revelada.
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
      // As palavras de destaque só acendem em lime quando a frase inteira
      // já foi revelada (mesmo ponto em que o scrub acima termina).
      ScrollTrigger.create({
        trigger: "[data-statement]",
        start: "bottom 45%",
        end: "bottom top",
        toggleClass: { targets: "[data-statement]", className: "is-lit" },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  const words = intro.statement.split(" ");
  const emphasis = new Set<string>(intro.emphasis);

  return (
    <section ref={root} className="section relative bg-graphite text-paper">
      <div className="wrap">
        <h2 className="mb-8 max-w-4xl font-anek text-display-sm font-semibold text-paper/55">{intro.title}</h2>
        <p data-statement className={`statement max-w-5xl font-anek text-display-md font-semibold leading-[1.08] text-paper ${reducedMotion ? "is-lit" : ""}`}>
          {words.map((w, i) => (
            <span key={i} data-w data-emphasis={emphasis.has(w.toLowerCase()) ? "" : undefined} className={`mr-[0.28em] inline-block ${emphasis.has(w.toLowerCase()) ? "text-paper" : "text-paper/60"}`}>
              {w}
            </span>
          ))}
        </p>
      </div>

    </section>
  );
}
