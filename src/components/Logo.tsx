/** Marca textual da LP. Substitua pelo SVG oficial do DS (Marca & Logos) se desejar. */
export function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="AUVP Prodígios — voltar ao topo">
      <span className="relative grid h-8 w-8 place-items-center rounded-[7px] bg-forest text-paper font-anek text-base font-extrabold">
        A
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-lime transition-transform duration-320 ease-elastic group-hover:scale-150" />
      </span>
      <span className={`font-anek text-lg font-bold tracking-tight ${inverted ? "text-ink" : "text-paper"}`}>
        AUVP <span className={inverted ? "text-forest" : "text-lime"}>Prodígios</span>
      </span>
    </a>
  );
}
