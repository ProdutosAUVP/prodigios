import { useCallback, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Intro } from "@/components/Intro";
import { Process } from "@/components/Process";
import { Trails } from "@/components/Trails";
import { NotRequired } from "@/components/NotRequired";
import { Culture } from "@/components/Culture";
import { Benefits } from "@/components/Benefits";
import { Fit } from "@/components/Fit";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

/**
 * Ordem das dobras (alternância do DS: preta → cinza → branca → preta):
 * Loader → Hero → About (branca) → Intro (grafite) → Process (cinza) → Trails → NotRequired (branca)
 * → Culture → Benefits (cinza) → Fit (verde/preta) → CTA → Footer.
 * Sem cena 3D: o fundo das dobras escuras é o preto sólido da marca.
 */
export default function App() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const onLoaderDone = useCallback(() => setReady(true), []);

  useLenis(!reducedMotion);

  return (
    <>
      <Loader onDone={onLoaderDone} reducedMotion={reducedMotion} />
      <Nav ready={ready} />

      <main className="relative z-10">
        <Hero ready={ready} reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
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
