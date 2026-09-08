import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registro único do plugin. Importe `gsap`/`ScrollTrigger` sempre daqui.
gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "power3.out", duration: 0.9 });

export { gsap, ScrollTrigger };

/**
 * Transições CSS (hover elástico, etc.) brigam com tweens `from()` do GSAP:
 * o GSAP lê o valor computado no meio da transição e o elemento trava no
 * estado inicial. Desliga as transições dos alvos e devolve uma função que
 * as restaura — chame no `onComplete` do tween.
 */
export function freezeTransitions(targets: gsap.TweenTarget): () => void {
  const els = gsap.utils.toArray<HTMLElement>(targets);
  els.forEach((el) => {
    el.style.transition = "none";
  });
  return () => {
    els.forEach((el) => {
      el.style.transition = "";
    });
  };
}

/** Easings nomeados — os do DS + os elásticos da LP. */
export const EASE = {
  ds: "power1.out",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.6)",
  back: "back.out(1.7)",
} as const;
