import { splitWords } from "@/lib/text";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Cabeçalho de dobra: título display (Anek Latin) + subtítulo opcional. Sem eyebrow. */
export function SectionHeader({ title, subtitle, align = "left", tone = "dark", className = "" }: Props) {
  const isDark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <h2 className={`text-display-md ${isDark ? "text-paper" : "text-foreground"}`}>{splitWords(title)}</h2>
      {subtitle && (
        <p data-reveal className={`mt-5 max-w-2xl text-lg leading-relaxed ${align === "center" ? "mx-auto" : ""} ${isDark ? "text-paper/65" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
