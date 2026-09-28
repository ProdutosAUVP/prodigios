import { Eye } from "./Eye";

/** Marca da LP: olho AUVP (símbolo oficial) + nome do programa ("AUVP" bold, "Carreiras" Anek peso normal). */
export function Logo({ className = "", inverted = false, href = "#top" }: { className?: string; inverted?: boolean; href?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-3 ${className}`} aria-label={href === "#top" ? "AUVP Carreiras — voltar ao topo" : "AUVP Carreiras — página inicial"}>
      <Eye className={`h-6 w-auto transition-transform duration-600 ease-elastic group-hover:scale-110 ${inverted ? "text-ink" : "text-paper"}`} title="Olho AUVP" />
      <span className={`font-anek text-lg font-bold tracking-tight ${inverted ? "text-ink" : "text-paper"}`}>
        AUVP <span className={`font-normal ${inverted ? "text-ink/70" : "text-paper/70"}`}>Carreiras</span>
      </span>
    </a>
  );
}
