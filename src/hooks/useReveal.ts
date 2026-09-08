import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, freezeTransitions } from "@/lib/gsap";

type RevealOptions = {
  /** seletor dos filhos a animar; default: [data-reveal] */
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  disabled?: boolean;
};

/**
 * Reveal genérico ao entrar na viewport. Elementos com [data-reveal] dentro
 * do container sobem e aparecem em cascata. Palavras marcadas com
 * [data-word] (splitWords) sobem de dentro da máscara.
 */
export function useReveal<T extends HTMLElement>(opts: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const { selector = "[data-reveal]", y = 40, stagger = 0.08, start = "top 80%", once = true, disabled } = opts;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || disabled) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll(selector);
      const words = root.querySelectorAll("[data-word]");

      if (words.length) {
        gsap.from(words, {
          yPercent: 110,
          rotation: 4,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
          scrollTrigger: { trigger: root, start, once },
        });
      }
      if (items.length) {
        const restore = freezeTransitions(items);
        gsap.from(items, {
          y,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger,
          onComplete: restore,
          scrollTrigger: { trigger: root, start, once },
        });
      }
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [selector, y, stagger, start, once, disabled]);

  return ref;
}
