import { learn, notFor } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { splitWords } from "@/lib/text";

/**
 * Duas colunas em contraste: o que você vai aprender (verde) × para quem
 * NÃO é (preto). Itens entram em cascata; hover desloca com elasticidade.
 */
export function Fit({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion, stagger: 0.1 });

  return (
    <section ref={root} className="relative grid lg:grid-cols-2">
      {/* Aprender — verde AUVP */}
      <div className="section relative overflow-hidden bg-forest px-6 text-paper md:px-12 lg:pl-[max(24px,calc((100vw-1400px)/2+24px))] lg:pr-16">
        <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-mint/25 blur-3xl" />
        <h2 className="text-display-sm text-paper md:text-display-md">{splitWords(learn.title)}</h2>
        <ul className="mt-[var(--section-gap)] space-y-[var(--stack)]">
          {learn.items.map((t, i) => (
            <li key={t} data-reveal className="group flex items-start gap-4 rounded-lg border border-paper/10 bg-paper/5 p-5 transition-all duration-320 ease-elastic hover:translate-x-2 hover:border-paper/50 hover:bg-paper/10">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-paper text-forest font-anek text-sm font-extrabold transition-transform duration-320 ease-elastic group-hover:scale-110">
                {i + 1}
              </span>
              <span className="font-anek text-xl font-semibold leading-snug md:text-2xl">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Não é para — preto */}
      <div className="section relative overflow-hidden bg-ink px-6 text-paper md:px-12 lg:pl-16 lg:pr-[max(24px,calc((100vw-1400px)/2+24px))] grain">
        <h2 className="text-display-sm text-paper md:text-display-md">{splitWords(notFor.title)}</h2>
        <ul className="mt-[var(--section-gap)] space-y-[var(--stack)]">
          {notFor.items.map((t) => (
            <li key={t} data-reveal className="group flex items-start gap-4 rounded-lg border border-paper/10 p-5 transition-all duration-320 ease-elastic hover:-translate-x-2 hover:border-paper/40">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-paper/20 text-paper/60 transition-all duration-320 ease-elastic group-hover:rotate-90 group-hover:border-paper group-hover:text-paper">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </span>
              <span className="font-anek text-xl font-semibold leading-snug text-paper/85 md:text-2xl">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
