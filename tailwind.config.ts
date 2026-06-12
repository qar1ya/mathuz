import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#00d4aa",
        "brand-dark": "#00b894",
        "dark-bg": "#0d0d0f",
        "dark-sidebar": "#111113",
        "dark-card": "#1a1a1e",
        "dark-hover": "#222226",
        "dark-border": "#2a2a2e",
      },
    },
  },
  plugins: [],
};

export default config;