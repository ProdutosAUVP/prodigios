import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LegalPage } from "@/components/LegalPage";
import { privacy, terms } from "@/data/legal";
import "./styles/globals.css";

// Entrada das páginas legais: o <html data-doc="..."> escolhe o documento.
const doc = document.documentElement.dataset.doc === "termos" ? terms : privacy;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LegalPage doc={doc} />
  </StrictMode>,
);
