import { about } from "@/data/content";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

/**
 * "O que é a AUVP?": quatro credenciais em grade (dobra branca, entre o Hero
 * e a Intro). Cada card abre com o dado grande (60 mil+, Top 1, …) em Anek,
 * seguido do título e da explicação. Hover oficial do DS + elasticidade.
 */
export function About({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion, stagger: 0.1 });

  return (
    <section ref={root} id="auvp" className="section relative bg-white text-ink">
      <div className="wrap-wide">
        <SectionHeader tone="light" title={about.title} className="section-head" />

        <div className="grid gap-[var(--stack)] sm:grid-cols-2 lg:grid-cols-4">
          {about.items.map((item) => (
            <article key={item.title} data-reveal className="card card-elastic group relative flex flex-col overflow-hidden bg-mist p-7">
              <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-ink/[0.04] transition-transform duration-600 ease-expo group-hover:scale-[2.4]" />
              <p className="relative font-anek text-5xl font-extrabold leading-none tracking-tight text-ink">{item.stat}</p>
              <h3 className="relative mt-8 font-anek text-xl font-bold leading-tight text-ink">{item.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-ink transition-transform duration-600 ease-expo group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
