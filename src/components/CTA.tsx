import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { cta, privacyNotice, site } from "@/data/content";
import { photos } from "@/data/photos";
import { Photo } from "./Photo";
import { Button, ArrowIcon } from "./Button";
import { useReveal } from "@/hooks/useReveal";
import { splitWords } from "@/lib/text";
import { MIN_AGE, ageOn, todayIso } from "@/lib/age";

type Step = "data" | "notice" | "blocked" | "done";
type Status = "idle" | "sending" | "error";

type Data = {
  nome: string;
  nascimento: string;
  instituicao: string;
  serie: string;
  email: string;
  telefone: string;
  acessibilidade: "" | "nao" | "sim";
  acessibilidadeQual: string;
};

const EMPTY: Data = {
  nome: "",
  nascimento: "",
  instituicao: "",
  serie: "",
  email: "",
  telefone: "",
  acessibilidade: "",
  acessibilidadeQual: "",
};

const isMinor = (nascimento: string) => {
  const age = ageOn(nascimento);
  return age !== null && age < MIN_AGE;
};

/**
 * Inscrição em duas etapas: (1) dados mínimos, (2) aviso de privacidade
 * resumido + os dois checkboxes de ciência, desmarcados. Só a etapa 2 envia.
 *
 * Menores de 14 anos: assim que a data de nascimento indica menos de 14, o
 * formulário é trocado pela mensagem de bloqueio e os dados digitados são
 * descartados da memória. Nada vai para o endpoint nem para o navegador
 * (sem localStorage/rascunho). O endpoint deve repetir essa checagem.
 *
 * Envia para VITE_FORM_ENDPOINT; sem endpoint, roda em modo demonstração.
 */
export function CTA({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useReveal<HTMLElement>({ disabled: reducedMotion });
  const [step, setStep] = useState<Step>("data");
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Data>(EMPTY);
  const [contactError, setContactError] = useState(false);
  const [checks, setChecks] = useState({ age: false, terms: false });

  const set = <K extends keyof Data>(key: K, value: Data[K]) => setData((d) => ({ ...d, [key]: value }));

  function block() {
    setData(EMPTY);
    setChecks({ age: false, terms: false });
    setStatus("idle");
    setStep("blocked");
  }

  function restart() {
    setData(EMPTY);
    setChecks({ age: false, terms: false });
    setContactError(false);
    setStatus("idle");
    setStep("data");
  }

  function onBirthChange(value: string) {
    if (isMinor(value)) return block();
    set("nascimento", value);
  }

  function onContinue(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isMinor(data.nascimento)) return block();
    if (!data.email.trim() && !data.telefone.trim()) {
      setContactError(true);
      return;
    }
    setContactError(false);
    setStep("notice");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // guarda redundante: nunca envia sem idade válida e sem as duas ciências
    if (isMinor(data.nascimento) || ageOn(data.nascimento) === null) return block();
    if (!checks.age || !checks.terms) return;

    const payload = {
      nome: data.nome.trim(),
      data_nascimento: data.nascimento,
      instituicao: data.instituicao.trim(),
      serie_curso: data.serie.trim(),
      email: data.email.trim(),
      telefone: data.telefone.trim(),
      acessibilidade: data.acessibilidade,
      acessibilidade_recurso: data.acessibilidade === "sim" ? data.acessibilidadeQual.trim() : "",
      confirma_14_anos: true,
      ciencia_termos: true,
      versao_aviso_privacidade: privacyNotice.version,
      versao_termos: privacyNotice.termsVersion,
      enviado_em: new Date().toISOString(),
    };

    setStatus("sending");
    if (!site.formEndpoint) {
      await new Promise((r) => setTimeout(r, 700));
      setData(EMPTY);
      setStatus("idle");
      setStep("done");
      return;
    }
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return setStatus("error");
      setData(EMPTY);
      setStatus("idle");
      setStep("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={root} id="inscricao" className="section relative overflow-hidden bg-ink grain">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--paper)/0.06),transparent_60%)] blur-3xl" />

      {/*
        Grid de 12 colunas com as duas colunas esticadas na mesma altura:
        à esquerda, título + texto e a foto em arco, que cresce (flex-1) até a
        base do formulário, agora mais alto; à direita, o formulário, com o
        botão ancorado embaixo. No mobile a foto some e a ordem é título,
        texto, formulário.
      */}
      <div className="wrap-wide relative grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-8">
        <div className="flex flex-col lg:col-span-5">
          <h2 className="max-w-md text-display-md text-paper">{splitWords(cta.title)}</h2>
          <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-paper/70">{cta.text}</p>

          <div data-reveal className="relative mt-10 hidden min-h-[26rem] lg:block lg:flex-1">
            <div className="clip-arch absolute inset-0 overflow-hidden">
              <Photo photo={photos.ctaSide} position="center 30%" className="h-full w-full !rounded-none" />
            </div>
            <div className="glass absolute right-6 top-6 rounded-lg px-5 py-4">
              <p className="label text-paper/60">{cta.sideLabel}</p>
              <p className="font-anek text-2xl font-bold text-paper">{cta.sideTitle}</p>
            </div>
          </div>
        </div>

        <div data-reveal className="lg:col-span-7">
          <div className="glass relative flex h-full flex-col rounded-lg p-6 md:p-10" aria-live="polite">
            {step === "done" && (
              <div className="py-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime text-lime-foreground">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <h3 className="mt-6 font-anek text-3xl font-bold text-paper">{cta.doneTitle}</h3>
                <p className="mt-2 text-paper/70">{cta.doneText}</p>
                <button type="button" onClick={restart} className="btn btn-ghost mt-8">{cta.doneAgain}</button>
              </div>
            )}

            {step === "blocked" && (
              <div className="py-10 text-center" role="alert">
                <h3 className="font-anek text-3xl font-bold text-paper">{cta.blocked.title}</h3>
                <p className="mx-auto mt-3 max-w-md text-paper/70">{cta.blocked.text}</p>
                <button type="button" onClick={restart} className="btn btn-ghost mt-8">{cta.blocked.back}</button>
              </div>
            )}

            {step === "data" && (
              <form onSubmit={onContinue} className="flex h-full flex-col" aria-describedby="form-help">
                <StepHeader n={1} title={cta.formTitle} help={cta.help} />

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <Field className="md:col-span-2" label={cta.fields.nome.label} name="nome" autoComplete="name" placeholder={cta.fields.nome.placeholder} value={data.nome} onChange={(v) => set("nome", v)} required />
                  <Field label={cta.fields.nascimento.label} name="nascimento" type="date" min="1900-01-01" max={todayIso()} value={data.nascimento} onChange={onBirthChange} required />
                  <Field label={cta.fields.serie.label} name="serie" placeholder={cta.fields.serie.placeholder} value={data.serie} onChange={(v) => set("serie", v)} required />
                  <Field className="md:col-span-2" label={cta.fields.instituicao.label} name="instituicao" placeholder={cta.fields.instituicao.placeholder} value={data.instituicao} onChange={(v) => set("instituicao", v)} required />
                  <Field label={cta.fields.email.label} name="email" type="email" autoComplete="email" placeholder={cta.fields.email.placeholder} value={data.email} onChange={(v) => { set("email", v); setContactError(false); }} aria-describedby="contact-hint" />
                  <Field label={cta.fields.telefone.label} name="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder={cta.fields.telefone.placeholder} value={data.telefone} onChange={(v) => { set("telefone", v); setContactError(false); }} aria-describedby="contact-hint" />
                  <p id="contact-hint" className={`-mt-2 text-sm md:col-span-2 ${contactError ? "text-error" : "text-paper/50"}`} role={contactError ? "alert" : undefined}>
                    {contactError ? cta.contactError : cta.contactHint}
                  </p>

                  <fieldset className="md:col-span-2">
                    <legend className="mb-3 text-sm leading-snug text-paper/80">{cta.accessibility.question}</legend>
                    <div className="flex gap-3">
                      <Choice name="acessibilidade" value="nao" checked={data.acessibilidade === "nao"} onChange={() => set("acessibilidade", "nao")}>{cta.accessibility.no}</Choice>
                      <Choice name="acessibilidade" value="sim" checked={data.acessibilidade === "sim"} onChange={() => set("acessibilidade", "sim")}>{cta.accessibility.yes}</Choice>
                    </div>
                    {data.acessibilidade === "sim" && (
                      <div className="mt-4">
                        <Field label={cta.accessibility.whichLabel} name="acessibilidadeQual" placeholder={cta.accessibility.whichPlaceholder} value={data.acessibilidadeQual} onChange={(v) => set("acessibilidadeQual", v)} required autoFocus />
                      </div>
                    )}
                    <p className="mt-3 text-sm text-paper/50">{cta.accessibility.note}</p>
                  </fieldset>
                </div>

                <div className="mt-auto pt-8">
                  <Button type="submit" variant="lime" magnetic={false} className="group w-full">
                    {cta.next}
                    <ArrowIcon />
                  </Button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-paper/55">
                    {cta.legalNote[0]}
                    <DocLink href={site.privacyUrl}>{cta.legalNote[1]}</DocLink>
                    {cta.legalNote[2]}
                    <DocLink href={site.termsUrl}>{cta.legalNote[3]}</DocLink>
                    {cta.legalNote[4]}
                  </p>
                </div>
              </form>
            )}

            {step === "notice" && (
              <form onSubmit={onSubmit} className="flex h-full flex-col">
                <StepHeader n={2} title={cta.noticeTitle} />

                <div data-lenis-prevent tabIndex={0} aria-label="Aviso de Privacidade" className="notice mt-6 max-h-[22rem] overflow-y-auto rounded-md border border-paper/10 bg-ink/40 p-5 text-sm leading-relaxed text-paper/75 md:p-6">
                  <p>{privacyNotice.intro}</p>
                  <p className="mt-3 font-bold text-paper">{privacyNotice.age}</p>
                  <h4 className="mt-6 font-anek text-xl text-paper">{privacyNotice.heading}</h4>
                  <ul className="mt-3 grid gap-2.5">
                    {privacyNotice.items.map((it) => (
                      <li key={it.label} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-paper/50" />
                        <span><strong className="text-paper">{it.label}:</strong> {it.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5">
                    {privacyNotice.more[0]}
                    <DocLink href={site.privacyUrl}>{privacyNotice.more[1]}</DocLink>
                    {privacyNotice.more[2]}
                    <DocLink href={site.termsUrl}>{privacyNotice.more[3]}</DocLink>
                    {privacyNotice.more[4]}
                  </p>
                </div>

                <div className="mt-6 grid gap-4">
                  <Check checked={checks.age} onChange={(v) => setChecks((c) => ({ ...c, age: v }))}>{privacyNotice.checks.age}</Check>
                  <Check checked={checks.terms} onChange={(v) => setChecks((c) => ({ ...c, terms: v }))}>
                    {privacyNotice.checks.terms[0]}
                    <DocLink href={site.termsUrl}>{privacyNotice.checks.terms[1]}</DocLink>
                    {privacyNotice.checks.terms[2]}
                  </Check>
                </div>

                <div className="mt-auto pt-8">
                  <Button type="submit" variant="lime" magnetic={false} className="group w-full" disabled={!checks.age || !checks.terms || status === "sending"}>
                    {status === "sending" ? cta.sending : cta.button}
                    <ArrowIcon />
                  </Button>
                  <button type="button" onClick={() => setStep("data")} className="mt-4 w-full text-center text-sm text-paper/60 underline-offset-4 transition-colors duration-240 hover:text-paper hover:underline">
                    {cta.back}
                  </button>

                  {status === "error" && <p role="alert" className="mt-4 text-sm text-error">{cta.error}</p>}
                  {!site.formEndpoint && <p className="mt-4 text-center text-xs text-paper/40">{cta.demo}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .field {
          width: 100%; height: 52px; padding-inline: 1rem;
          border-radius: 5px; border: 1px solid hsl(0 0% 100% / 0.14);
          background: hsl(0 0% 100% / 0.04); color: hsl(var(--paper));
          font-family: var(--font-body); font-size: 1rem;
          color-scheme: dark;
          transition: border-color var(--dur-base) ease, background-color var(--dur-base) ease, transform 320ms var(--ease-elastic);
        }
        .field::placeholder { color: hsl(0 0% 100% / 0.35); }
        .field:hover { border-color: hsl(0 0% 100% / 0.3); }
        .field:focus { outline: none; border-color: hsl(var(--paper) / 0.7); background: hsl(0 0% 100% / 0.07); transform: translateY(-2px); }
        .notice { scrollbar-width: thin; scrollbar-color: hsl(0 0% 100% / 0.2) transparent; }
        .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-lime:disabled:hover { background: hsl(var(--lime)); color: hsl(var(--lime-foreground)); box-shadow: none; }
      `}</style>
    </section>
  );
}

function StepHeader({ n, title, help }: { n: number; title: string; help?: string }) {
  return (
    <div>
      <p className="label text-paper/50">Etapa {n} de 2</p>
      <h3 className="mt-2 font-anek text-3xl font-bold text-paper">{title}</h3>
      {help && <p id="form-help" className="mt-1 text-sm text-paper/60">{help}</p>}
    </div>
  );
}

type FieldProps = { label: string; name: string; value: string; onChange: (v: string) => void; className?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "className">;

function Field({ label, name, value, onChange, className = "", ...rest }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="label mb-2 block text-paper/70">{label}</span>
      <input name={name} className="field" value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </label>
  );
}

function Choice({ children, ...rest }: { children: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" required className="peer sr-only" {...rest} />
      <span className="inline-flex h-11 min-w-24 items-center justify-center rounded-btn border border-paper/20 px-5 text-sm font-medium text-paper/80 transition-colors duration-240 hover:border-paper/50 peer-checked:border-paper peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
        {children}
      </span>
    </label>
  );
}

function Check({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-paper/80">
      <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
        <input type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer h-5 w-5 cursor-pointer appearance-none rounded-[4px] border border-paper/35 bg-transparent transition-colors duration-150 checked:border-paper checked:bg-paper group-hover:border-paper/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" />
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute h-3.5 w-3.5 text-ink opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
      </span>
      <span>{children}</span>
    </label>
  );
}

function DocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="font-medium text-paper underline decoration-paper/40 underline-offset-4 transition-colors duration-240 hover:decoration-paper">
      {children}
    </a>
  );
}
