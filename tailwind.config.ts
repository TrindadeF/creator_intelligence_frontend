import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Noir analytics palette
        bg: {
          base:    "#08080a",
          surface: "#0f0f12",
          raised:  "#16161c",
          overlay: "#1d1d25",
        },
        border: {
          DEFAULT: "#22222e",
          focus:   "#3a3a50",
        },
        cyan: {
          50:  "#ecfeff",
          400: "#22d3ee",
          500: "#06b6d4",
          glow: "#00d4ff",
        },
        amber: {
          400: "#fbbf24",
          glow: "#f59e0b",
        },
        rose: {
          glow: "#f43f5e",
        },
        emerald: {
          glow: "#10b981",
        },
        ink: {
          50:  "#fafafa",
          100: "#e4e4e7",
          400: "#a1a1aa",
          600: "#52525b",
          800: "#27272a",
        },
      },
      fontFamily: {
        mono:    ["var(--font-mono)", "JetBrains Mono", "monospace"],
        display: ["var(--font-display)", "serif"],
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan":   "0 0 20px rgba(0, 212, 255, 0.15)",
        "glow-amber":  "0 0 20px rgba(245, 158, 11, 0.15)",
        "glow-rose":   "0 0 20px rgba(244, 63, 94, 0.15)",
        "card":        "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
        "card-hover":  "0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(0, 212, 255, 0.1)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(34,34,46,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,34,46,0.5) 1px, transparent 1px)",
        "noise":        "url('/noise.png')",
      },
      backgroundSize: {
        "grid": "32px 32px",
      },
      animation: {
        "fade-in":      "fadeIn 0.4s ease forwards",
        "slide-up":     "slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-glow":   "pulseGlow 2s ease-in-out infinite",
        "number-count": "numberCount 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
