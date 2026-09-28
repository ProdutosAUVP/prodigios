import { legal, nav, site } from "@/data/content";
import { Logo } from "./Logo";

const link = "transition-colors duration-240 hover:text-paper";

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
            <a key={n.href} href={n.href} className={link}>{n.label}</a>
          ))}
          <a href="#inscricao" className={link}>Inscrição</a>
        </nav>
      </div>

      <div className="wrap-wide mt-10 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-paper/70" aria-label="Documentos legais">
          <a href={site.privacyUrl} className={link}>{legal.privacy}</a>
          <a href={site.termsUrl} className={link}>{legal.terms}</a>
          <span>
            {legal.dpo} <a href={`mailto:${site.dpoEmail}`} className={`underline decoration-paper/30 underline-offset-4 ${link}`}>{site.dpoEmail}</a>
          </span>
        </nav>
        <div className="flex flex-col gap-1 text-paper/40 md:items-end">
          <p>{site.controller} (grupo AUVP) · CNPJ {site.cnpj}</p>
          <p>© {new Date().getFullYear()} AUVP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
