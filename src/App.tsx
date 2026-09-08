import { useCallback, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Process } from "@/components/Process";
import { Trails } from "@/components/Trails";
import { NotRequired } from "@/components/NotRequired";
import { Culture } from "@/components/Culture";
import { Benefits } from "@/components/Benefits";
import { Fit } from "@/components/Fit";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Scene } from "@/components/three/Scene";

/**
 * Ordem das dobras (alternância do DS: preta → cinza → branca → preta):
 * Loader → Hero → Intro → Process (cinza) → Trails → NotRequired (branca)
 * → Culture → Benefits (cinza) → Fit (verde/preta) → CTA → Footer.
 */
export default function App() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  useLenis(!reducedMotion);
  useMouseParallax();

  return (
    <>
      <Loader onDone={onLoaderDone} reducedMotion={reducedMotion} />
      <Scene enabled={ready && !reducedMotion} />

      <Nav ready={ready} />

      <main className="relative z-10">
        <Hero ready={ready} reducedMotion={reducedMotion} />
        <Intro reducedMotion={reducedMotion} />
        <Process reducedMotion={reducedMotion} />
        <Trails reducedMotion={reducedMotion} />
        <NotRequired reducedMotion={reducedMotion} />
        <Culture reducedMotion={reducedMotion} />
        <Benefits reducedMotion={reducedMotion} />
        <Fit reducedMotion={reducedMotion} />
        <CTA reducedMotion={reducedMotion} />
      </main>
      <Footer />
    </>
  );
}
