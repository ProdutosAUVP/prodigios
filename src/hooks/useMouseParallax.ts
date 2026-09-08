import { useEffect } from "react";
import { scrollState } from "@/lib/scroll-progress";

/** Publica a posição do mouse normalizada (-1..1) em scrollState para a cena 3D e parallax. */
export function useMouseParallax() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
