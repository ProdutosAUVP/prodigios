import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Base para GitHub Pages:
// - publicado em https://<org>.github.io/prodigios/ -> "/prodigios/"
// - domínio customizado (raiz)                      -> "/"
// Pode ser sobrescrito por env: VITE_BASE=/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? "/prodigios/",
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { host: true, port: 8080 },
  preview: { host: "127.0.0.1", port: 4173 },
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Three.js e R3F ficam num chunk próprio, carregado sob demanda
        // (React.lazy em src/components/three/Scene.tsx).
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          if (/[\\/]node_modules[\\/](three|@react-three)[\\/]/.test(id)) return "three";
          if (/[\\/]node_modules[\\/](gsap|lenis)[\\/]/.test(id)) return "motion";
          return undefined;
        },
      },
    },
  },
});
