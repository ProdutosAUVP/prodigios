import { splitWords } from "@/lib/text";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Cabeçalho de dobra: label (Roboto Bold 12px uppercase) + título display (Anek Latin). */
export function SectionHeader({ label, title, subtitle, align = "left", tone = "dark", className = "" }: Props) {
  const isDark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p data-reveal className={`label mb-5 flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${isDark ? "text-lime" : "text-primary"}`}>
        <span className={`h-px w-8 ${isDark ? "bg-lime" : "bg-primary"}`} aria-hidden />
        {label}
      </p>
      <h2 className={`text-display-md ${isDark ? "text-paper" : "text-foreground"}`}>{splitWords(title)}</h2>
      {subtitle && (
        <p data-reveal className={`mt-5 max-w-2xl text-lg leading-relaxed ${align === "center" ? "mx-auto" : ""} ${isDark ? "text-paper/65" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
