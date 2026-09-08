import { Suspense, lazy, useEffect, useState } from "react";

// Chunk separado: Three.js + R3F só baixam quando o Loader termina
// (ver manualChunks em vite.config.ts).
const SceneCanvas = lazy(() => import("./SceneCanvas"));

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Cena 3D fixa atrás do conteúdo. Fica visível nas dobras escuras
 * (que usam fundo semi-transparente) e é escondida nas claras.
 * Pausa o render (frameloop="never") quando uma dobra clara cobre a
 * viewport inteira, para não gastar GPU à toa.
 */
export function Scene({ enabled }: { enabled: boolean }) {
  const [mount, setMount] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!enabled || !supportsWebGL()) return;
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    // Só monta quando o navegador estiver ocioso — o Hero já está animando.
    const idle = (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300)))(() => setMount(true));
    return () => {
      mq.removeEventListener("change", sync);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
    };
  }, [enabled]);

  useEffect(() => {
    if (!mount) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const h = window.innerHeight;
      const covered = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-off]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 0 && r.bottom >= h;
      });
      setActive(!covered && document.visibilityState === "visible");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", check);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", check);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mount]);

  if (!mount) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Suspense fallback={null}>
        <SceneCanvas compact={compact} active={active} />
      </Suspense>
    </div>
  );
}
