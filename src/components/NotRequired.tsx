import { useLayoutEffect } from "react";
import { gsap, freezeTransitions } from "@/lib/gsap";
import { notRequired } from "@/data/content";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

/**
 * "O que NÃO fazemos questão que você tenha": cada requisito entra e
 * é riscado ao vivo (linha cresce com o scroll), com o carimbo "opcional".
 */
export function NotRequired({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion });

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-strike]").forEach((row) => {
        const stamp = row.querySelector<HTMLElement>("[data-stamp]")!;
        const restore = freezeTransitions([row, stamp]);
        const tl = gsap.timeline({ onComplete: restore, scrollTrigger: { trigger: row, start: "top 70%", once: true } });
        tl.from(row, { x: -30, opacity: 0, duration: 0.8, ease: "expo.out" })
          // Risco por linha: background-size cresce de 0% a 100% (box-decoration-break: clone)
          .to(row.querySelector("[data-line]"), { backgroundSize: "100% 3px", duration: 0.7, ease: "power3.inOut" }, "-=0.2")
          .from(stamp, { scale: 0, rotation: -20, duration: 0.7, ease: "back.out(2.5)" }, "-=0.3");
      });
    }, root);
    return () => ctx.revert();
  }, [root, reducedMotion]);

  return (
    <section ref={root} className="section relative bg-white text-foreground">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader tone="light" title={notRequired.title} />
          <p data-reveal className="mt-6 max-w-md text-muted-foreground">
            Potencial e vontade pesam mais que currículo. O resto a gente constrói junto.
          </p>
        </div>

        <ul className="flex flex-col lg:col-span-7">
          {notRequired.items.map((item) => (
            <li key={item.title} data-strike className="group relative border-t border-border py-8 last:border-b">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-lg">
                  <p data-line className="strike inline font-anek text-3xl font-bold md:text-4xl">
                    {item.title}
                  </p>
                  <p className="mt-2 text-muted-foreground">{item.text}</p>
                </div>
                <span data-stamp className="label rotate-[-6deg] rounded-btn border-2 border-primary px-3 py-1.5 text-primary transition-transform duration-320 ease-elastic group-hover:rotate-0 group-hover:scale-110">
                  Opcional
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
