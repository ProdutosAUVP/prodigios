import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "cta" | "inverted" | "lime" | "ghost";

const VARIANT: Record<Variant, string> = {
  cta: "btn-cta",
  inverted: "btn-inverted",
  lime: "btn-lime",
  ghost: "btn-ghost",
};

type Base = { variant?: Variant; magnetic?: boolean; className?: string; children: ReactNode };
type AnchorProps = Base & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = Base & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Botão do DS (Sora Bold, caixa alta, radius 5px, hover vazado) com a
 * micro-interação magnética da LP.
 */
export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "cta", magnetic = true, className = "", children } = props;
  const ref = useMagnetic<HTMLElement>(magnetic ? 0.3 : 0);
  const classes = `btn ${VARIANT[variant]} ${className}`;

  if ("href" in props && props.href) {
    const rest = omitOwn(props as AnchorProps);
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  const rest = omitOwn(props as ButtonProps);
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} className={classes} {...rest}>
      {children}
    </button>
  );
}

/** Remove as props próprias do Button antes de repassar o resto ao elemento nativo. */
function omitOwn<T extends Base>(props: T): Omit<T, keyof Base> {
  const rest = { ...props } as Partial<T>;
  delete rest.variant;
  delete rest.magnetic;
  delete rest.className;
  delete rest.children;
  return rest as Omit<T, keyof Base>;
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 transition-transform duration-240 group-hover:translate-x-1 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
