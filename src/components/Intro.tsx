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
    <section ref={root} className="relative bg-ink/80 py-24 md:py-36">
      <div className="wrap">
        <p className="label mb-8 text-lime">{intro.label}</p>
        <p data-statement className="max-w-5xl font-anek text-display-md font-semibold leading-[1.08] text-paper">
          {words.map((w, i) => (
            <span key={i} data-w className={`mr-[0.28em] inline-block ${emphasis.has(w.toLowerCase()) ? "text-lime" : ""}`}>
              {w}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-20 overflow-hidden border-y border-paper/10 py-5" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-anek text-2xl font-bold uppercase tracking-tight text-paper/25 md:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              {["Tecnologia", "Growth & Marketing", "Negócios & Finanças", "Alta performance", "Sentimento de dono"].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  {t}
                  <span className="h-2 w-2 rounded-full bg-lime" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
