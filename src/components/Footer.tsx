import { nav, site } from "@/data/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink py-12 text-paper/60">
      <div className="wrap-wide flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-sm">{site.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Rodapé">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors duration-240 hover:text-paper">{n.label}</a>
          ))}
          <a href="#inscricao" className="transition-colors duration-240 hover:text-paper">Inscrição</a>
        </nav>
      </div>
      <div className="wrap-wide mt-10 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/40 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} AUVP. Todos os direitos reservados.</p>
        <p>Design System AUVP como base · feito com React, GSAP e Lenis</p>
      </div>
    </footer>
  );
}
