import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  onDone: () => void;
  reducedMotion: boolean;
};

const WORDS = ["Garra", "Foco", "Entrega", "Prodígios"];

/**
 * Loading screen: contador 0→100 e palavras da cultura passando; ao terminar,
 * duas cortinas verdes abrem e revelam o Hero (o Hero escuta `onDone`).
 */
export function Loader({ onDone, reducedMotion }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      onDone();
      return;
    }
    const el = root.current!;
    const n = { v: 0 };
    document.documentElement.classList.add("overflow-hidden");

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove("overflow-hidden");
        onDone();
      },
    });

    tl.to(n, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(n.v);
        if (counter.current) counter.current.textContent = String(v).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${n.v / 100})`;
        setWord(Math.min(WORDS.length - 1, Math.floor((n.v / 100) * WORDS.length)));
      },
    })
      .to(".loader-content", { yPercent: -30, opacity: 0, duration: 0.45, ease: "power3.in" }, "-=0.1")
      .to(".loader-curtain-top", { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.1")
      .to(".loader-curtain-bottom", { yPercent: 100, duration: 0.95, ease: "expo.inOut" }, "<")
      .to(el, { autoAlpha: 0, duration: 0.2 }, "-=0.2");

    return () => {
      tl.kill();
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [onDone, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden" aria-live="polite" aria-label="Carregando AUVP Prodígios">
      {/* Cortinas */}
      <div className="loader-curtain-top absolute inset-x-0 top-0 h-1/2 bg-forest" />
      <div className="loader-curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-forest" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--lime)/0.18),transparent_60%)]" />

      <div className="loader-content relative flex h-full flex-col justify-between p-6 md:p-10">
        <div className="flex items-center justify-between">
          <span className="label text-paper/70">AUVP · Programa de talentos</span>
          <span className="label text-lime">2026</span>
        </div>

        <div className="flex flex-col items-start gap-4">
          <p className="font-anek text-display-lg font-extrabold leading-none text-paper">
            {WORDS.map((w, i) => (
              <span key={w} className={`block transition-all duration-320 ease-expo ${i === word ? "opacity-100 translate-x-0" : "absolute opacity-0 -translate-x-3"}`}>
                {w}
                <span className="text-lime">.</span>
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="w-full max-w-sm">
            <div className="h-px w-full bg-paper/15">
              <div ref={bar} className="h-full origin-left bg-lime" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
          <span ref={counter} className="font-anek text-6xl font-extrabold tabular-nums leading-none text-paper md:text-8xl">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
