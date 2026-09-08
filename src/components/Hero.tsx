import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hero, site } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { Button, ArrowIcon } from "./Button";

type Props = { ready: boolean; reducedMotion: boolean };

/**
 * Hero, mobile-first:
 *   1. título display em largura total (3 linhas curtas que cabem em 360px);
 *   2. subtítulo + ações;
 *   3. faixa de fotos em grade assimétrica (2 no mobile, 3 a partir de sm).
 * No desktop, 2 e 3 dividem a linha (5/7 colunas). Cor: só o CTA leva o lime.
 * A cena 3D (curva + ponto fora da curva) fica atrás, fixa.
 */
export function Hero({ ready, reducedMotion }: Props) {
  const root = useRef<HTMLElement>(null);

  // Estado inicial escondido (antes do loader terminar)
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { yPercent: 110, rotation: 2 });
      gsap.set("[data-hero-fade]", { y: 20, opacity: 0 });
      gsap.set("[data-hero-photo]", { y: 60, opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Entrada — junto com a abertura das cortinas do loader
  useLayoutEffect(() => {
    if (!ready || !root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.25 });
      tl.to("[data-hero-line]", { yPercent: 0, rotation: 0, duration: 1.3, stagger: 0.1 })
        .to("[data-hero-fade]", { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.9")
        .to("[data-hero-photo]", { y: 0, opacity: 1, duration: 1.3, stagger: 0.1 }, "-=1");
    }, root);
    return () => ctx.revert();
  }, [ready, reducedMotion]);

  // Parallax por scroll (fotos em profundidades diferentes) + texto recua
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        gsap.to(el, {
          yPercent: -Number(el.dataset.depth) * 30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -10,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "50% top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} id="top" className="relative isolate overflow-hidden pt-[72px] grain lg:min-h-[100svh]">
      <div aria-hidden className="pointer-events-none absolute -left-1/3 top-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,hsl(var(--forest)/0.45),transparent_60%)] blur-3xl" />

      <div className="wrap-wide relative flex flex-col gap-10 pb-[var(--section-y)] pt-10 sm:pt-14 lg:min-h-[calc(100svh-72px)] lg:justify-center lg:gap-14">
        {/* 1. Título */}
        <h1 data-hero-copy className="font-anek text-display-xl font-extrabold text-paper">
          {hero.title.map((line, i) => (
            <span key={line} className="line-mask">
              <span data-hero-line className={i === hero.title.length - 1 ? "text-paper/55" : ""}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          {/* 2. Subtítulo + ações */}
          <div data-hero-copy className="flex flex-col gap-8 lg:col-span-5">
            <p data-hero-fade className="max-w-md text-base leading-relaxed text-paper/70 sm:text-lg">
              {hero.subtitle}
            </p>
            <div data-hero-fade className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={site.applyUrl} variant="lime" className="group w-full sm:w-auto">
                {hero.primaryCta}
                <ArrowIcon />
              </Button>
              <Button href="#trilhas" variant="ghost" className="w-full sm:w-auto">
                {hero.secondaryCta}
              </Button>
            </div>
            <ul data-hero-fade className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/50">
              {hero.facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-paper/50" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Fotos — grade assimétrica, sem posicionamento absoluto */}
          <div className="grid grid-cols-2 items-end gap-[var(--stack)] sm:grid-cols-3 lg:col-span-7">
            <div data-hero-photo data-depth="0.5" className="will-change-transform">
              <Photo photo={photos.heroA} loading="eager" className="aspect-[4/5]" />
            </div>
            <div data-hero-photo data-depth="1" className="mb-8 will-change-transform sm:mb-12">
              <Photo photo={photos.heroB} loading="eager" className="clip-arch aspect-[3/4]" />
            </div>
            <div data-hero-photo data-depth="0.8" className="hidden will-change-transform sm:block sm:mb-4">
              <Photo photo={photos.heroC} loading="eager" className="aspect-[5/6]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
