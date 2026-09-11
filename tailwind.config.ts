import type { Config } from "tailwindcss";

/**
 * Tailwind da landing AUVP Prodígios.
 *
 * Base: tokens do Design System AUVP (ProdutosAUVP/central) expostos como
 * variáveis CSS em src/styles/tokens.css. As extensões (escala "display",
 * paleta lime/mint, easings elásticos, keyframes) são exclusivas desta LP —
 * o DS é o ponto de partida, não o teto.
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2rem", xl: "3rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        anek: ['"Anek Latin"', "system-ui", "sans-serif"],
        roboto: ['"Roboto"', "system-ui", "sans-serif"],
        sora: ['"Sora"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala display da LP (extrapola o DS, que para no text-5xl).
        "display-xl": ["clamp(2.5rem, 6vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6.5vw, 5.75rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 2.8vw, 2.25rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          emphasis: "hsl(var(--primary-emphasis))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cta: {
          DEFAULT: "hsl(var(--cta))",
          foreground: "hsl(var(--cta-foreground))",
          emphasis: "hsl(var(--cta-emphasis))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          dark: "hsl(var(--brand-dark))",
          hover: "hsl(var(--brand-hover))",
        },
        // Extensões da LP — não existem no DS.
        ink: "hsl(var(--ink))",
        graphite: "hsl(var(--graphite))",
        paper: "hsl(var(--paper))",
        mist: "hsl(var(--mist))",
        lime: {
          DEFAULT: "hsl(var(--lime))",
          foreground: "hsl(var(--lime-foreground))",
        },
        mint: "hsl(var(--mint))",
        forest: "hsl(var(--forest))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        btn: "5px",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.06)",
        "card-dark": "0 8px 24px rgba(0,0,0,0.45)",
        glow: "0 0 0 1px hsl(var(--lime) / 0.35), 0 12px 48px -12px hsl(var(--lime) / 0.55)",
        "glow-forest": "0 24px 80px -24px hsl(155 93% 11% / 0.55)",
      },
      transitionTimingFunction: {
        ds: "ease",
        overshoot: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        elastic: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        150: "150ms",
        240: "240ms",
        320: "320ms",
        600: "600ms",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.5" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.8s ease-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
