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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Shaadi Squad Inspired Palette
        blush: {
          DEFAULT: "#F9CFCA",
          50: "#FEF7F6",
          100: "#FDF0EE",
          200: "#F9CFCA",
          300: "#F4ABA2",
          400: "#EE8579",
        },
        coral: {
          DEFAULT: "#F2887B",
          light: "#F5A196",
          dark: "#E06D5F",
          hover: "#D65C4E",
        },
        ivory: {
          DEFAULT: "#F8F0E8",
          50: "#FCF8F4",
          100: "#F8F0E8",
          200: "#EFE1D2",
          300: "#E4CEB8",
        },
        burgundy: {
          DEFAULT: "#6F1829",
          50: "#F9ECEE",
          100: "#F0CFD5",
          600: "#801C30",
          700: "#6F1829",
          800: "#571320",
          900: "#3E0B16",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#DFC286",
          dark: "#A7843F",
          50: "#FAF6ED",
          100: "#F3EACE",
          500: "#C6A15B",
          600: "#B18C44",
        },
        charcoal: {
          DEFAULT: "#333333", // Shaadi Squad soft charcoal body text
          soft: "#333333",
          light: "#5A544A",
          muted: "#666666",
          dark: "#222222",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
