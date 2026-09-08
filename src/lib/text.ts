import type { ReactNode } from "react";
import { createElement } from "react";

/** Divide uma frase em palavras, cada uma num <span> mascarado, para animação de reveal. */
export function splitWords(text: string, className = "inline-block"): ReactNode[] {
  return text.split(" ").map((word, i) =>
    createElement(
      "span",
      { key: `${word}-${i}`, className: "inline-block overflow-hidden align-bottom" },
      createElement("span", { className: `${className} will-change-transform`, "data-word": "" }, word + " "),
    ),
  );
}
