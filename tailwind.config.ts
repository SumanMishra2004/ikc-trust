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
        // Core palette
        ivory: "#F8F5ED",
        "warm-white": "#FFFDF8",
        sand: "#E9E0D1",
        "sand-dark": "#D9D2C5",
        forest: "#244B3C",
        "forest-dark": "#1B382D",
        "forest-light": "#315F4E",
        terracotta: "#B9674B",
        "terracotta-dark": "#9A523A",
        charcoal: "#292B27",
        "charcoal-muted": "#5C5E57",
        "charcoal-light": "#4A4D45",
        // Theme mapping
        surface: "#F8F5ED",
        "surface-dim": "#E9E0D1",
        primary: "#244B3C",
        secondary: "#B9674B",
        "on-surface": "#292B27",
        "on-surface-variant": "#5C5E57",
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "EB Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-eb-garamond)", "EB Garamond", "Georgia", "serif"],
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em" }],
        "display-md": ["44px", { lineHeight: "52px", letterSpacing: "-0.015em" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em" }],
        "headline-md": ["26px", { lineHeight: "34px", letterSpacing: "0" }],
        "headline-sm": ["22px", { lineHeight: "28px", letterSpacing: "0" }],
        "body-lg": ["18px", { lineHeight: "30px", letterSpacing: "-0.005em" }],
        "body-md": ["15px", { lineHeight: "24px", letterSpacing: "0" }],
        "body-sm": ["13px", { lineHeight: "20px", letterSpacing: "0.01em" }],
        "label-lg": ["14px", { lineHeight: "18px", letterSpacing: "0.06em" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.08em" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.1em" }],
      },
      spacing: {
        "gutter-edge": "clamp(1.5rem, 5vw, 5rem)",
        "2xl": "4rem",
        "3xl": "6rem",
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(to right, rgba(28,36,32,0.95) 0%, rgba(28,36,32,0.75) 40%, rgba(28,36,32,0.3) 70%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
