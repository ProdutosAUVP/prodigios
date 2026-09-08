import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;

/** Acesso ao Lenis fora do React (ex.: scrollTo de âncoras). */
export function getLenis() {
  return instance;
}

/**
 * Smooth scroll com Lenis sincronizado ao ticker do GSAP (padrão recomendado
 * pela documentação de ambos).
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Âncoras internas passam pelo Lenis (offset para a navegação fixa).
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      ev.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, [enabled]);
}
