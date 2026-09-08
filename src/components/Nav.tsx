import { useEffect, useState } from "react";
import { nav, site, hero } from "@/data/content";
import { Logo } from "./Logo";
import { Button } from "./Button";

/** Navegação fixa: transparente no Hero, vidro escuro após rolar; some ao descer e volta ao subir. */
export function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-600 ease-expo ${
        ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${hidden ? "-translate-y-full" : ""}`}
    >
      <div className={`transition-colors duration-320 ${scrolled || open ? "glass bg-ink/70" : ""}`}>
        <div className="wrap-wide flex h-[72px] items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Seções">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="group relative font-roboto text-sm font-medium text-paper/75 transition-colors duration-240 hover:text-paper">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-320 ease-expo group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href={site.applyUrl} variant="lime" className="!h-11 !px-6">
              {hero.primaryCta}
            </Button>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-btn border border-paper/20 text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-320 ease-expo ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-320 ease-expo ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <div id="mobile-menu" className={`md:hidden overflow-hidden transition-[max-height] duration-600 ease-expo ${open ? "max-h-96" : "max-h-0"}`}>
          <div className="wrap-wide flex flex-col gap-1 pb-6 pt-2">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 font-anek text-2xl font-semibold text-paper/85 transition-colors hover:bg-paper/5 hover:text-lime">
                {item.label}
              </a>
            ))}
            <Button href={site.applyUrl} variant="lime" magnetic={false} className="mt-3 w-full" onClick={() => setOpen(false)}>
              {hero.primaryCta}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
