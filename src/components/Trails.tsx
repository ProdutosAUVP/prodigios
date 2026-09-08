import { useLayoutEffect, useRef } from "react";
import { gsap, freezeTransitions } from "@/lib/gsap";
import { trails } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

const PHOTO = { tech: photos.trailsTech, growth: photos.trailsGrowth, biz: photos.trailsBiz } as const;

const ICONS: Record<string, JSX.Element> = {
  tech: <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 4l-4 16" />,
  growth: <><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></>,
  biz: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5h3.75a1.75 1.75 0 010 3.5h-2.5a1.75 1.75 0 000 3.5H14.5" /></>,
};

/**
 * Trilhas: três cards que se "montam" (entram deslocados e girados, com
 * elasticidade) e inclinam em 3D seguindo o mouse no hover.
 */
export function Trails({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion });
  const grid = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!grid.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      const restore = freezeTransitions("[data-trail]");
      gsap.from("[data-trail]", {
        y: 120,
        opacity: 0,
        rotation: (i) => (i - 1) * 6,
        scale: 0.92,
        duration: 1.4,
        stagger: 0.14,
        ease: "elastic.out(1, 0.7)",
        onComplete: restore,
        scrollTrigger: { trigger: grid.current, start: "top 78%", once: true },
      });
    }, grid);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Tilt 3D com o mouse (só ponteiro fino)
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, y: -10, duration: 0.5, ease: "power3.out", transformPerspective: 900 });
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <section ref={root} id="trilhas" className="section relative bg-ink grain">
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[50vmax] w-[50vmax] translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,hsl(var(--forest)/0.6),transparent_60%)] blur-3xl" />

      <div className="wrap-wide relative">
        <SectionHeader title={trails.title} subtitle={trails.subtitle} className="section-head" />

        <div ref={grid} className="grid gap-[var(--stack)] md:grid-cols-3" style={{ perspective: "1200px" }}>
          {trails.items.map((t, i) => (
            <article
              key={t.id}
              data-trail
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className={`group relative flex flex-col overflow-hidden rounded-lg border border-paper/10 bg-[hsl(var(--card-on-preta))] will-change-transform ${i === 1 ? "md:-translate-y-8" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* brilho que segue o mouse */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-320 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), hsl(var(--mint)/0.18), transparent 45%)" }} />

              <Photo photo={PHOTO[t.id]} className="aspect-[4/3] w-full !rounded-none" imgClassName="transition-transform duration-[1200ms] ease-expo group-hover:scale-105" />

              <div className="relative flex flex-1 flex-col p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="label text-paper/50">{t.n}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-paper/10 text-paper transition-all duration-320 ease-elastic group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{ICONS[t.id]}</svg>
                  </span>
                </div>
                <h3 className="font-anek text-3xl font-bold text-paper">{t.title}</h3>
                <p className="mt-3 text-paper/60">{t.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {t.areas.map((a) => (
                    <li key={a} className="rounded-full border border-paper/15 px-3 py-1 text-xs font-medium text-paper/80 transition-all duration-240 hover:border-paper hover:bg-paper hover:text-ink">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
