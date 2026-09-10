import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Eye } from "./Eye";

type Props = {
  onDone: () => void;
  reducedMotion: boolean;
};

const WORDS = ["Foco", "Entrega", "Verdade", "Prodígios"];

/**
 * Loading screen: o olho AUVP abre, o contador vai de 0 a 100 enquanto as
 * palavras da cultura passam; ao terminar, duas cortinas verdes abrem e
 * revelam o Hero (o Hero escuta `onDone`).
 *
 * Tudo em uma única timeline GSAP, sem estado React (nada re-renderiza no
 * meio da animação). Se algo der errado, um fallback libera a página em 6 s.
 */
export function Loader({ onDone, reducedMotion }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      onDone();
      return;
    }
    const el = root.current;
    if (!el) return;

    const finish = () => {
      if (done.current) return;
      done.current = true;
      document.documentElement.classList.remove("overflow-hidden");
      onDone();
    };

    document.documentElement.classList.add("overflow-hidden");
    const fallback = window.setTimeout(finish, 6000);

    const ctx = gsap.context(() => {
      const counter = el.querySelector<HTMLElement>("[data-counter]")!;
      const bar = el.querySelector<HTMLElement>("[data-bar]")!;
      const words = gsap.utils.toArray<HTMLElement>("[data-word-slot]");
      const n = { v: 0 };

      gsap.set(words, { yPercent: 110 });
      gsap.set(words[0], { yPercent: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // olho abre
      tl.from("[data-eye]", { scaleY: 0.08, opacity: 0, duration: 0.9, ease: "expo.out" });

      // contador + barra
      tl.to(
        n,
        {
          v: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.round(n.v)).padStart(3, "0");
            bar.style.transform = `scaleX(${n.v / 100})`;
          },
        },
        "-=0.5",
      );

      // palavras: cada uma sobe por 0.5 s e sai por cima
      const step = 2 / WORDS.length;
      words.forEach((w, i) => {
        if (i === 0) return;
        const at = `-=${2 - i * step}`;
        tl.to(words[i - 1], { yPercent: -110, duration: 0.5 }, at);
        tl.to(w, { yPercent: 0, duration: 0.5 }, "<");
      });

      // saída: conteúdo some, cortinas abrem
      tl.to("[data-content]", { yPercent: -20, opacity: 0, duration: 0.45, ease: "power3.in" }, "+=0.15")
        // libera a página no instante em que as cortinas começam a abrir,
        // para o Hero entrar junto com a revelação
        .call(finish, [], "-=0.1")
        .to("[data-curtain-top]", { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "<")
        .to("[data-curtain-bottom]", { yPercent: 100, duration: 0.95, ease: "expo.inOut" }, "<")
        .to(el, { autoAlpha: 0, duration: 0.2, onComplete: finish }, "-=0.2");
    }, el);

    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [onDone, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden" aria-live="polite" aria-label="Carregando AUVP Future">
      <div data-curtain-top className="absolute inset-x-0 top-0 h-1/2 bg-graphite" />
      <div data-curtain-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-graphite" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--paper)/0.06),transparent_60%)]" />

      <div data-content className="relative flex h-full flex-col items-center justify-center gap-8 p-6 md:p-10">
        <Eye className="h-14 w-auto text-paper will-change-transform md:h-20" title="Olho AUVP" data-eye />

        <div className="relative h-[1.1em] overflow-hidden font-anek text-display-lg font-extrabold leading-none text-paper" aria-hidden>
          {WORDS.map((w) => (
            <span key={w} data-word-slot className="absolute inset-x-0 top-0 block whitespace-nowrap text-center will-change-transform">
              {w}
              <span className="text-lime">.</span>
            </span>
          ))}
          {/* placeholder invisível para dar largura ao bloco */}
          <span className="invisible block whitespace-nowrap">{WORDS[WORDS.length - 1]}.</span>
        </div>

        <div className="flex w-full max-w-sm items-center gap-5">
          <div className="h-px flex-1 bg-paper/15">
            <div data-bar className="h-full origin-left bg-paper" style={{ transform: "scaleX(0)" }} />
          </div>
          <span data-counter className="font-anek text-3xl font-bold tabular-nums leading-none text-paper">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
