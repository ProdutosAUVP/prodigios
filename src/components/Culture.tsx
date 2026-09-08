import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";
import { culture } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { useReveal } from "@/hooks/useReveal";

/**
 * Cultura: dobra preta imersiva. Foto com parallax e recorte, frase-manifesto
 * que revela palavra a palavra, pilares com números gigantes em outline.
 */
export function Culture({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion, stagger: 0.12 });

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-parallax-img]", { yPercent: -12 }, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo("[data-cw]", { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: { trigger: "[data-manifesto]", start: "top 70%", end: "bottom 50%", scrub: 0.3 },
      });
      gsap.from("[data-pillar]", {
        xPercent: -8,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-pillars]", start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [root, reducedMotion]);

  const words = culture.statement.split(" ");
  const hot = new Set(["resultados,", "transparência", "meritocracia.", "“sentimento", "dono”"]);

  return (
    <section ref={root} id="cultura" className="relative overflow-hidden bg-ink/85 py-24 md:py-36 grain">
      <div className="wrap-wide grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5">
          <div className="sticky top-28">
            <div className="clip-slant-r relative aspect-[4/5] overflow-hidden rounded-lg">
              <div data-parallax-img className="absolute inset-[-14%_0]">
                <Photo photo={photos.culture} overlay={0.4} className="h-full w-full" />
              </div>
            </div>
            <div data-reveal className="glass absolute -bottom-6 -right-4 max-w-[240px] rounded-lg p-5 md:-right-10">
              <p className="font-anek text-4xl font-extrabold text-paper">Erre rápido.</p>
              <p className="font-anek text-4xl font-extrabold text-paper">Conserte rápido.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <h2 className="text-display-md text-paper">{culture.title}</h2>

          <p data-manifesto className="mt-10 max-w-2xl font-anek text-2xl font-medium leading-snug text-paper md:text-[2rem]">
            {words.map((w, i) => (
              <span key={i} data-cw className={`mr-[0.26em] inline-block ${hot.has(w.toLowerCase()) ? "text-mint" : ""}`}>
                {w}
              </span>
            ))}
          </p>

          <ol data-pillars className="mt-14 divide-y divide-paper/10 border-y border-paper/10">
            {culture.pillars.map((p, i) => (
              <li key={p} data-pillar className="group flex items-center gap-6 py-5 transition-colors duration-240 hover:bg-paper/[0.03]">
                <span className="stroke-text font-anek text-5xl font-extrabold transition-all duration-320 group-hover:text-paper group-hover:[-webkit-text-stroke:0]">
                  0{i + 1}
                </span>
                <span className="font-anek text-2xl font-semibold text-paper transition-transform duration-320 ease-elastic group-hover:translate-x-2 md:text-3xl">{p}</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-paper/20 transition-all duration-320 ease-elastic group-hover:scale-[2] group-hover:bg-paper" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
