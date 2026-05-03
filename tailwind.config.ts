/**
 * tailwind.config.ts
 *
 * NOTE: This project uses Tailwind CSS v4 which is primarily CSS-configured
 * via the @theme directive in globals.css. This file is kept for tooling
 * compatibility (IntelliSense, plugins) and documents the design system.
 *
 * Core theme tokens are defined in app/globals.css under @theme inline {}.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ─── Color Palette ──────────────────────────────────────── */
      colors: {
        bg:           "#0a0a1a",
        glass:        "rgba(255, 255, 255, 0.06)",
        "glass-hover":"rgba(255, 255, 255, 0.10)",
        "accent-pink":"#f4b8c1",
        "accent-gold":"#c9a84c",
        "text-base":  "rgba(255, 255, 255, 0.88)",
        "text-muted": "rgba(255, 255, 255, 0.45)",
        "border-glass":"rgba(255, 255, 255, 0.12)",
      },

      /* ─── Font Families ──────────────────────────────────────── */
      fontFamily: {
        heading: ["var(--font-noto-serif-jp)", "Noto Serif JP", "serif"],
        body:    ["var(--font-syne)", "Syne", "sans-serif"],
        sans:    ["var(--font-syne)", "Syne", "sans-serif"],
      },

      /* ─── Border Radius ──────────────────────────────────────── */
      borderRadius: {
        glass: "16px",
        pill:  "9999px",
      },

      /* ─── Box Shadow ─────────────────────────────── */
      boxShadow: {
        glass:
          "0 8px 32px rgba(0, 0, 0, 0.30), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
        "glass-lg":
          "0 16px 48px rgba(0, 0, 0, 0.40), 0 1px 0 rgba(255, 255, 255, 0.10) inset",
        "glow-pink":
          "0 0 20px rgba(244, 184, 193, 0.20)",
        "glow-gold":
          "0 0 20px rgba(201, 168, 76, 0.20)",
      },

      /* ─── Backdrop Blur ────────────────────────────── */
      backdropBlur: {
        glass: "12px",
        "glass-lg": "24px",
      },

      /* ─── Background Image ───────────────────────────────────── */
      backgroundImage: {
        "gradient-sakura":
          "linear-gradient(135deg, #f4b8c1 0%, #c9a84c 100%)",
        "gradient-navy":
          "linear-gradient(180deg, #0a0a1a 0%, #080814 100%)",
        "gradient-radial-pink":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(244, 184, 193, 0.15) 0%, transparent 60%)",
      },

      /* ─── Animation ──────────────────────────────────────────── */
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        shimmer:   "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
