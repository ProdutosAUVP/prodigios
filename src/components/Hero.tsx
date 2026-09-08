import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hero, site } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { Button, ArrowIcon } from "./Button";

type Props = { ready: boolean; reducedMotion: boolean };

/**
 * Hero editorial, mobile-first:
 *   1. título display (3 linhas curtas que cabem em 360px; a última, "fora da
 *      curva.", é a única palavra em lime da página fora dos CTAs);
 *   2. subtítulo, ações e fatos;
 *   3. composição fotográfica: foto grande em arco (forma-assinatura) com
 *      uma foto menor sobreposta e um selo de vidro.
 * No desktop, texto e composição dividem a linha (7/5 colunas).
 * Entrada: linhas sobem da máscara, o arco se revela de baixo para cima
 * (clip-path) enquanto a foto "assenta" (Ken Burns), a foto menor e o selo
 * chegam por último. Scroll: parallax em duas profundidades e o texto recua.
 */
export function Hero({ ready, reducedMotion }: Props) {
  const root = useRef<HTMLElement>(null);

  // Estado inicial escondido (antes do loader terminar)
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { yPercent: 110, rotation: 2 });
      gsap.set("[data-hero-fade]", { y: 20, opacity: 0 });
      gsap.set("[data-hero-arch]", { clipPath: "inset(100% 0 0 0 round var(--radius))" });
      gsap.set("[data-hero-arch] img", { scale: 1.14 });
      gsap.set("[data-hero-small]", { y: 40, opacity: 0 });
      gsap.set("[data-hero-badge]", { scale: 0, opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Entrada — junto com a abertura das cortinas do loader
  useLayoutEffect(() => {
    if (!ready || !root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.25 });
      tl.to("[data-hero-line]", { yPercent: 0, rotation: 0, duration: 1.3, stagger: 0.1 })
        .to("[data-hero-arch]", { clipPath: "inset(0% 0 0 0 round var(--radius))", duration: 1.5, ease: "expo.inOut" }, "-=1.2")
        .to("[data-hero-arch] img", { scale: 1, duration: 2.4 }, "<")
        .to("[data-hero-fade]", { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=2")
        .to("[data-hero-small]", { y: 0, opacity: 1, duration: 1.2 }, "-=1.4")
        .to("[data-hero-badge]", { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.8)" }, "-=0.9");
    }, root);
    return () => ctx.revert();
  }, [ready, reducedMotion]);

  // Scroll: parallax em profundidades diferentes + texto recua
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        gsap.to(el, {
          yPercent: -Number(el.dataset.depth) * 28,
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

  const last = hero.title.length - 1;

  return (
    <section ref={root} id="top" className="relative isolate overflow-hidden pt-[72px] grain lg:min-h-[100svh]">
      {/* fundo: grade de pontos + halo da marca atrás da composição */}
      <div aria-hidden className="dots pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute right-[-20%] top-[10%] h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(circle,hsl(var(--forest)/0.5),transparent_62%)] blur-3xl" />

      <div className="wrap-wide relative grid gap-14 pb-[var(--section-y)] pt-10 sm:pt-14 lg:min-h-[calc(100svh-72px)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-16">
        {/* Texto */}
        <div data-hero-copy className="flex flex-col gap-8 lg:col-span-7">
          <h1 className="font-anek text-display-xl font-extrabold text-paper">
            {hero.title.map((line, i) => (
              <span key={line} className="line-mask">
                <span data-hero-line className={i === last ? "text-lime" : ""}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

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

        {/* Composição fotográfica */}
        <div className="relative mx-auto w-full max-w-[520px] pb-8 pl-4 lg:col-span-5 lg:mx-0 lg:max-w-none lg:justify-self-end lg:pb-10 lg:pl-8">
          <div data-depth="0.5" className="will-change-transform">
            <div data-hero-arch className="clip-arch halftone-edge relative overflow-hidden">
              <Photo photo={photos.heroB} loading="eager" className="aspect-[4/5] !rounded-none" imgClassName="will-change-transform" />
            </div>
          </div>

          <div data-hero-small data-depth="1.1" className="absolute -bottom-0 -left-0 w-[46%] will-change-transform sm:w-[42%]">
            <div className="rounded-lg ring-[6px] ring-ink">
              <Photo photo={photos.heroA} loading="eager" className="aspect-square" />
            </div>
          </div>

          <div data-hero-badge className="glass absolute right-4 top-4 flex items-center gap-3 rounded-lg px-4 py-3 sm:right-6 sm:top-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-paper" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
            </span>
            <span className="font-anek text-sm font-semibold leading-none text-paper">{hero.badge}</span>
          </div>
        </div>
      </div>

      {/* indicador de scroll */}
      <div data-hero-fade className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/40 lg:flex">
        <span className="label text-[10px]">Role</span>
        <span className="h-10 w-px overflow-hidden bg-paper/15">
          <span className="block h-1/2 w-full animate-[float_1.6s_ease-in-out_infinite] bg-paper/70" />
        </span>
      </div>
    </section>
  );
}
