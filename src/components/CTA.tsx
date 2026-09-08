import { useState, type FormEvent } from "react";
import { cta, site, trails } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { Button, ArrowIcon } from "./Button";
import { useReveal } from "@/hooks/useReveal";
import { splitWords } from "@/lib/text";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Inscrição: formulário curto (nome, e-mail, trilha). Envia para
 * VITE_FORM_ENDPOINT (Formspree/Getform/n8n…). Sem endpoint, roda em modo
 * demonstração e mostra a confirmação localmente.
 */
export function CTA({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion });
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    if (!site.formEndpoint) {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("done");
      form.reset();
      return;
    }
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={root} id="inscricao" className="relative overflow-hidden bg-ink/85 py-24 md:py-36 grain">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--forest)/0.7),transparent_60%)] blur-3xl" />

      <div className="wrap-wide relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="text-display-lg text-paper">{splitWords(cta.title)}</h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">{cta.text}</p>

          <div data-reveal className="relative mt-10 hidden lg:block">
            <div className="clip-blob w-[70%] rotate-[-2deg] overflow-hidden">
              <Photo photo={photos.ctaSide} overlay={0.3} className="aspect-[4/3]" />
            </div>
            <div className="glass absolute right-[10%] top-[35%] rounded-lg p-4">
              <p className="label text-paper/60">Sua trilha</p>
              <p className="font-anek text-2xl font-bold text-paper">Começa aqui.</p>
            </div>
          </div>
        </div>

        <div data-reveal className="lg:col-span-6">
          <form onSubmit={onSubmit} className="glass relative rounded-2xl p-6 md:p-10" aria-describedby="form-help">
            {status === "done" ? (
              <div className="py-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime text-lime-foreground">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <h3 className="mt-6 font-anek text-3xl font-bold text-paper">Inscrição recebida.</h3>
                <p className="mt-2 text-paper/70">Fique de olho no seu e-mail: o próximo passo são os testes.</p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
                  Enviar outra
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-anek text-3xl font-bold text-paper">{cta.formTitle}</h3>
                <p id="form-help" className="mt-1 text-sm text-paper/60">Leva menos de um minuto.</p>

                <div className="mt-8 grid gap-5">
                  <Field label="Nome completo" name="nome" type="text" autoComplete="name" placeholder="Como quer ser chamado" />
                  <Field label="E-mail" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" />
                  <label className="group block">
                    <span className="label mb-2 block text-paper/70">Trilha de interesse</span>
                    <select name="trilha" required defaultValue="" className="field appearance-none">
                      <option value="" disabled>Escolha uma trilha</option>
                      {trails.items.map((t) => (
                        <option key={t.id} value={t.id} className="bg-ink">{t.title}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <Button type="submit" variant="lime" magnetic={false} className="group mt-8 w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Enviando…" : cta.button}
                  <ArrowIcon />
                </Button>

                {status === "error" && (
                  <p role="alert" className="mt-4 text-sm text-error">Não conseguimos enviar agora. Tente novamente em instantes.</p>
                )}
                {!site.formEndpoint && (
                  <p className="mt-4 text-center text-xs text-paper/40">Modo demonstração — configure VITE_FORM_ENDPOINT para receber inscrições.</p>
                )}
              </>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .field {
          width: 100%; height: 52px; padding-inline: 1rem;
          border-radius: 5px; border: 1px solid hsl(0 0% 100% / 0.14);
          background: hsl(0 0% 100% / 0.04); color: hsl(var(--paper));
          font-family: var(--font-body); font-size: 1rem;
          transition: border-color var(--dur-base) ease, background-color var(--dur-base) ease, transform 320ms var(--ease-elastic);
        }
        .field::placeholder { color: hsl(0 0% 100% / 0.35); }
        .field:hover { border-color: hsl(0 0% 100% / 0.3); }
        .field:focus { outline: none; border-color: hsl(var(--paper) / 0.7); background: hsl(0 0% 100% / 0.07); transform: translateY(-2px); }
      `}</style>
    </section>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="label mb-2 block text-paper/70">{label}</span>
      <input name={name} required className="field" {...rest} />
    </label>
  );
}
