import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        C1: {
          DEFAULT: "rgb(26, 44, 56)",
          light: "rgb(40, 60, 75)",
          dark: "rgb(15, 30, 40)",
        },
      },

      keyframes: {
        scaleLoop: {
          "0%, 100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
        },
      },

      animation: {
        scaleLoop: "scaleLoop 1s infinite ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
