import { Eye } from "./Eye";

/** Marca da LP: olho AUVP (símbolo oficial) + nome do programa. */
export function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-3 ${className}`} aria-label="AUVP Prodígios — voltar ao topo">
      <Eye className={`h-6 w-auto transition-transform duration-600 ease-elastic group-hover:scale-110 ${inverted ? "text-ink" : "text-paper"}`} title="Olho AUVP" />
      <span className={`font-anek text-lg font-bold tracking-tight ${inverted ? "text-ink" : "text-paper"}`}>
        AUVP <span className={inverted ? "text-forest" : "text-lime"}>Prodígios</span>
      </span>
    </a>
  );
}
