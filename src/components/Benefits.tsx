import { benefits } from "@/data/content";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

const ICONS = [
  <><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M7 12h.01M17 12h.01" /></>,
  <><path d="M12 2l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 15.6 6.6 18.5l1.2-6L3.3 8.3l6.1-.7z" /></>,
  <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>,
  <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
];

/**
 * Benefícios em grade assimétrica (dobra cinza #F2F2F2 do DS). Cards com
 * hover oficial do DS + elasticidade e ícone que "pula".
 */
export function Benefits({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion, stagger: 0.1 });

  return (
    <section ref={root} id="beneficios" data-scene-off className="section relative bg-mist text-foreground">
      <div className="wrap-wide">
        <SectionHeader tone="light" title={benefits.title} align="center" className="section-head" />

        <div className="grid gap-[var(--stack)] md:grid-cols-6">
          {benefits.items.map((b, i) => (
            <article
              key={b.title}
              data-reveal
              className={`card card-elastic group relative overflow-hidden bg-white p-8 ${i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}`}
            >
              <div aria-hidden className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/[0.06] transition-transform duration-600 ease-expo group-hover:scale-[2.4]" />
              <span className="relative grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground transition-transform duration-600 ease-elastic group-hover:-translate-y-1.5 group-hover:rotate-[-10deg]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{ICONS[i]}</svg>
              </span>
              <h3 className="relative mt-8 font-anek text-2xl font-bold md:text-3xl">{b.title}</h3>
              <p className="relative mt-2 text-muted-foreground">{b.text}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-600 ease-expo group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
