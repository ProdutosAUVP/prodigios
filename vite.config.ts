import { defineConfig, type Connect, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Base path:
// - Vercel (env VERCEL=1 no build) ou domínio próprio -> "/"
// - GitHub Pages em https://<org>.github.io/prodigios/  -> "/prodigios/"
// VITE_BASE sempre tem prioridade: VITE_BASE=/ npm run build
const base = process.env.VITE_BASE ?? (process.env.VERCEL ? "/" : "/prodigios/");

// Páginas legais com URL limpa (/privacidade, /termos). Vercel (cleanUrls) e
// GitHub Pages resolvem sozinhos; este plugin faz o mesmo no dev e no preview.
const LEGAL_PAGES = ["privacidade", "termos"];
function cleanUrls(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const [pathname, query] = (req.url ?? "").split("?");
    const page = LEGAL_PAGES.find((p) => pathname === `${base}${p}`);
    if (page) req.url = `${base}${page}.html${query ? `?${query}` : ""}`;
    next();
  };
  return {
    name: "clean-urls",
    configureServer: (server) => void server.middlewares.use(rewrite),
    configurePreviewServer: (server) => void server.middlewares.use(rewrite),
  };
}

export default defineConfig({
  base,
  plugins: [react(), cleanUrls()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { host: true, port: 8080 },
  preview: { host: "127.0.0.1", port: 4173 },
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      // LP + páginas legais (Aviso de Privacidade e Termos), linkadas no formulário e no rodapé
      input: {
        main: path.resolve(__dirname, "index.html"),
        ...Object.fromEntries(LEGAL_PAGES.map((p) => [p, path.resolve(__dirname, `${p}.html`)])),
      },
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          if (/[\\/]node_modules[\\/](gsap|lenis)[\\/]/.test(id)) return "motion";
          return undefined;
        },
      },
    },
  },
});
