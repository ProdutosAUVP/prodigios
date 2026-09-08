import { learn, notFor } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { splitWords } from "@/lib/text";

/**
 * Duas colunas em contraste: o que você vai aprender (grafite) × para quem
 * NÃO é (preto). Um grid só, com duas linhas (títulos / listas): a linha
 * dos títulos tem a altura do título mais alto, então as duas listas
 * começam exatamente na mesma altura, e as células de cada coluna carregam
 * o próprio fundo para a coluna parecer contínua. No mobile a ordem do DOM
 * empilha título A, lista A, título B, lista B.
 * Lime: só nos números da lista de aprendizados (destaque pontual).
 */
export function Fit({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion, stagger: 0.1 });

  const padL = "px-6 md:px-12 lg:pl-[max(24px,calc((100vw-1400px)/2+24px))] lg:pr-16";
  const padR = "px-6 md:px-12 lg:pl-16 lg:pr-[max(24px,calc((100vw-1400px)/2+24px))]";

  return (
    <section ref={root} className="relative grid lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
      {/* Aprender — título */}
      <div className={`bg-graphite pt-[var(--section-y)] pb-[var(--section-gap)] text-paper lg:col-start-1 lg:row-start-1 ${padL}`}>
        <h2 className="max-w-xl text-display-sm text-paper md:text-display-md">{splitWords(learn.title)}</h2>
      </div>

      {/* Aprender — lista */}
      <div className={`bg-graphite pb-[var(--section-y)] text-paper lg:col-start-1 lg:row-start-2 ${padL}`}>
        <ul className="max-w-xl space-y-[var(--stack)]">
          {learn.items.map((t, i) => (
            <li key={t} data-reveal className="group flex items-start gap-4 rounded-lg border border-paper/10 bg-paper/5 p-5 transition-all duration-320 ease-elastic hover:translate-x-2 hover:border-paper/50 hover:bg-paper/10">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-lime text-lime-foreground font-anek text-sm font-extrabold transition-transform duration-320 ease-elastic group-hover:scale-110">
                {i + 1}
              </span>
              <span className="font-anek text-xl font-semibold leading-snug md:text-2xl">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Não é para — título */}
      <div className={`bg-ink pt-[var(--section-y)] pb-[var(--section-gap)] text-paper lg:col-start-2 lg:row-start-1 grain ${padR}`}>
        <h2 className="max-w-xl text-display-sm text-paper md:text-display-md">{splitWords(notFor.title)}</h2>
      </div>

      {/* Não é para — lista */}
      <div className={`relative bg-ink pb-[var(--section-y)] text-paper lg:col-start-2 lg:row-start-2 grain ${padR}`}>
        <ul className="max-w-xl space-y-[var(--stack)]">
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
