import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hero, site } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { Button, ArrowIcon } from "./Button";

type Props = { ready: boolean; reducedMotion: boolean };

/**
 * Hero: título com reveal linha a linha (dispara quando o Loader termina),
 * colagem assimétrica de fotos com parallax em profundidades diferentes e
 * a cena 3D por trás (montada em App, fixa).
 */
export function Hero({ ready, reducedMotion }: Props) {
  const root = useRef<HTMLElement>(null);

  // Entrada (após o loader)
  useLayoutEffect(() => {
    if (!ready || !root.current) return;
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(["[data-hero-line]", "[data-hero-fade]", "[data-hero-photo]"], { clearProps: "all", opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-line]", { yPercent: 110, rotation: 3, duration: 1.3, stagger: 0.12 })
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.9")
        .from("[data-hero-photo]", { y: 80, opacity: 0, rotation: () => gsap.utils.random(-6, 6), duration: 1.4, stagger: 0.12, ease: "expo.out" }, "-=1.1")
        .from("[data-hero-badge]", { scale: 0, duration: 0.8, ease: "back.out(2)" }, "-=0.8");
    }, root);
    return () => ctx.revert();
  }, [ready, reducedMotion]);

  // Parallax por scroll (cada foto numa profundidade) + fade do texto
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        const depth = Number(el.dataset.depth);
        gsap.to(el, {
          yPercent: -depth * 40,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -12,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} id="top" className="relative isolate min-h-[100svh] overflow-hidden pt-[72px] grain">
      {/* halo de marca */}
      <div aria-hidden className="pointer-events-none absolute -left-1/4 top-1/3 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,hsl(var(--forest)/0.55),transparent_60%)] blur-2xl" />

      <div className="wrap-wide relative grid min-h-[calc(100svh-72px)] grid-cols-12 items-center gap-y-12 py-16 lg:py-10">
        {/* Copy */}
        <div data-hero-copy className="col-span-12 lg:col-span-7">
          <p data-hero-fade className="label mb-6 flex items-center gap-3 text-lime">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 className="font-anek text-display-xl font-extrabold text-paper">
            {hero.title.map((line, i) => (
              <span key={line} className="line-mask">
                <span data-hero-line className={i === 2 ? "text-gradient-brand" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-fade className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 md:text-xl">
            {hero.subtitle}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={site.applyUrl} variant="lime" className="group">
              {hero.primaryCta}
              <ArrowIcon />
            </Button>
            <Button href="#trilhas" variant="ghost">
              {hero.secondaryCta}
            </Button>
          </div>

          <ul data-hero-fade className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper/55">
            <li className="flex items-center gap-2"><Dot />Qualquer curso</li>
            <li className="flex items-center gap-2"><Dot />Qualquer idade</li>
            <li className="flex items-center gap-2"><Dot />3 trilhas de carreira</li>
          </ul>
        </div>

        {/* Colagem assimétrica */}
        <div className="relative col-span-12 h-[440px] sm:h-[520px] lg:col-span-5 lg:h-[640px]">
          <div data-hero-photo data-depth="0.6" className="absolute left-0 top-6 w-[62%] rotate-[-3deg] will-change-transform">
            <Photo photo={photos.heroA} loading="eager" className="clip-slant aspect-[4/5] rounded-lg shadow-card-dark" />
          </div>
          <div data-hero-photo data-depth="1" className="absolute right-0 top-0 w-[46%] rotate-[4deg] will-change-transform">
            <Photo photo={photos.heroB} loading="eager" overlay={0.3} className="clip-arch aspect-[3/4] shadow-card-dark" />
          </div>
          <div data-hero-photo data-depth="1.4" className="absolute bottom-0 right-[8%] w-[50%] rotate-[-2deg] will-change-transform">
            <Photo photo={photos.heroC} loading="eager" overlay={0.12} className="aspect-[5/4] rounded-lg shadow-card-dark" />
          </div>

          <div data-hero-badge className="glass absolute bottom-[26%] left-[4%] flex items-center gap-3 rounded-lg px-4 py-3 shadow-card-dark">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-lime text-lime-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
            </span>
            <div className="leading-tight">
              <p className="font-anek text-lg font-bold text-paper">Alta performance</p>
              <p className="text-xs text-paper/60">desde o primeiro dia</p>
            </div>
          </div>
        </div>
      </div>

      {/* indicador de scroll */}
      <div data-hero-fade className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/40 md:flex">
        <span className="label text-[10px]">Role para descobrir</span>
        <span className="h-10 w-px overflow-hidden bg-paper/15">
          <span className="block h-1/2 w-full animate-[float_1.6s_ease-in-out_infinite] bg-lime" />
        </span>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />;
}
