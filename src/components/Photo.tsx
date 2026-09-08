import { useState } from "react";
import type { Photo as PhotoData } from "@/data/photos";

type Props = {
  photo: PhotoData;
  className?: string;
  imgClassName?: string;
  /** sobreposição com a cor da marca (0..1) */
  overlay?: number;
  loading?: "lazy" | "eager";
  /** posição do objeto na imagem, ex.: "center top" */
  position?: string;
};

/* Fallbacks em cinza (sem verde): variações leves de grafite para o preto. */
const TONES: Record<PhotoData["tone"], string> = {
  forest: "from-[hsl(0_0%_22%)] via-graphite to-ink",
  mint: "from-[hsl(0_0%_28%)] via-[hsl(0_0%_14%)] to-ink",
  lime: "from-[hsl(0_0%_18%)] via-graphite to-ink",
};

/**
 * Fotografia oficial da AUVP com fallback: se a imagem não carregar, mostra um
 * gradiente da marca no mesmo enquadramento — a página nunca "quebra".
 */
export function Photo({ photo, className = "", imgClassName = "", overlay = 0.2, loading = "lazy", position }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`photo relative overflow-hidden bg-ink ${className}`} aria-label={photo.alt}>
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${TONES[photo.tone]} transition-opacity duration-600 ${
          loaded && !failed ? "opacity-0" : "opacity-100"
        }`}
      />
      {!failed && (
        <img
          src={photo.src}
          alt={photo.alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: position ?? photo.position ?? "center" }}
          className={`absolute inset-0 h-full w-full object-cover saturate-[0.85] contrast-[1.03] transition-opacity duration-600 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
      {/* Véu neutro: escurece levemente para o texto e os adesivos assentarem */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `hsl(var(--ink) / ${overlay})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
      />
    </figure>
  );
}
