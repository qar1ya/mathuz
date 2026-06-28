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
        brand: "#7c3aed",
        "brand-dark": "#6d28d9",
        "dark-bg":     "#f5f5f7",
        "dark-sidebar":"#ffffff",
        "dark-card":   "#ffffff",
        "dark-hover":  "#f5f3ff",
        "dark-border": "#ebebeb",
      },
    },
  },
  plugins: [],
};

export default config;