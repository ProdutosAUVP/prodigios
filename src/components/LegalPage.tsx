import type { ReactNode } from "react";
import type { LegalDoc } from "@/data/legal";
import { site } from "@/data/content";
import { Logo } from "./Logo";

const HOME = import.meta.env.BASE_URL;

/** Transforma o e-mail do DPO em link dentro de um parágrafo. */
function linkify(text: string): ReactNode[] {
  return text.split(site.dpoEmail).flatMap((part, i) =>
    i === 0 ? [part] : [<a key={i} href={`mailto:${site.dpoEmail}`} className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">{site.dpoEmail}</a>, part],
  );
}

/** Página de leitura (Aviso de Privacidade / Termos): dobra clara, texto em ink, sem animação. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = doc.slug === "privacidade" ? { href: site.termsUrl, label: "Termos de Participação e Ciência" } : { href: site.privacyUrl, label: "Aviso de Privacidade" };

  return (
    <>
      <header className="bg-ink">
        <div className="wrap flex h-[72px] items-center justify-between">
          <Logo href={HOME} />
          <a href={`${HOME}#inscricao`} className="text-sm font-medium text-paper/70 transition-colors duration-240 hover:text-paper">Voltar à inscrição</a>
        </div>
      </header>

      <main className="bg-paper text-ink">
        <article className="wrap max-w-3xl py-16 md:py-24">
          <p className="label text-ink/50">{doc.kicker}</p>
          <h1 className="mt-4 text-display-md">{doc.title}</h1>
          <p className="mt-4 text-sm text-ink/55">{doc.version}</p>

          {doc.lead && (
            <div className="mt-10 grid gap-4 border-l-2 border-ink pl-5 text-lg leading-relaxed text-ink/80">
              {doc.lead.map((p) => <p key={p}>{linkify(p)}</p>)}
            </div>
          )}

          <div className="mt-14 grid gap-12">
            {doc.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-anek text-2xl md:text-3xl">{s.h}</h2>
                <div className="mt-4 grid gap-3 leading-relaxed text-ink/75">
                  {s.p?.map((p) => <p key={p}>{linkify(p)}</p>)}
                  {s.list && (
                    <ul className="grid gap-2 pl-1">
                      {s.list.map((li) => (
                        <li key={li} className="flex gap-3">
                          <span aria-hidden className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                          <span>{linkify(li)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after?.map((p) => <p key={p}>{linkify(p)}</p>)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
            <a href={other.href} className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">Ler também: {other.label}</a>
            {doc.pdf && (
              <a href={`${HOME}${doc.pdf}`} download className="btn btn-cta !bg-ink !text-paper hover:!bg-transparent hover:!text-ink hover:!border-ink">Baixar em PDF</a>
            )}
          </div>
        </article>
      </main>

      <footer className="bg-ink py-10 text-xs text-paper/50">
        <div className="wrap flex flex-col gap-2 md:flex-row md:justify-between">
          <p>{site.controller} · CNPJ {site.cnpj}</p>
          <p>Dúvidas sobre seus dados: <a href={`mailto:${site.dpoEmail}`} className="text-paper/80 hover:text-paper">{site.dpoEmail}</a></p>
        </div>
      </footer>
    </>
  );
}
