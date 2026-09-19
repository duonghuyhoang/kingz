import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Declared under `extend` so Tailwind's default palette (white, gray,
        // transparent, …) stays available instead of being replaced.
        "color-main": "rgb(var(--color-main-rgb) / <alpha-value>)",
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        background: "rgb(var(--color-background-rgb) / <alpha-value>)",
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        "sub-bg": "var(--color-sub-bg)",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
      animation: {
        "up-down": "upDown 2.5s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "pulse-ring": "pulseRing 3s ease-out infinite",
      },
      keyframes: {
        upDown: {
          "0%, 100%": { transform: "translateY(-16px)" },
          "50%": { transform: "translateY(16px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(6%, -8%, 0) scale(1.15)" },
          "66%": { transform: "translate3d(-6%, 6%, 0) scale(0.9)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      boxShadow: {
        glow: "0 0 60px -12px rgb(var(--color-main-rgb) / 0.6)",
        "glow-sm": "0 0 24px -6px rgb(var(--color-main-rgb) / 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
