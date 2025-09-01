// tailwind.config.ts
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4f46e5", // primary
          light: "#6366f1",
          dark: "#3730a3",
        },
        accent: "#06b6d4",
        muted: "#64748b",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-spectral)", "ui-serif", "serif"],
        heading: ["var(--font-spectral)", "ui-serif", "serif"],
      },
      fontSize: {
        // Title sizes for different screens
        'title-sm': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }], // 24px
        'title-md': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }], // 32px  
        'title-lg': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }], // 40px
        'title-xl': ['3rem', { lineHeight: '3.5rem', fontWeight: '700' }], // 48px
        'title-2xl': ['3.75rem', { lineHeight: '4rem', fontWeight: '800' }], // 60px
        
        // Subtitle sizes
        'subtitle-sm': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '500' }], // 18px
        'subtitle-md': ['1.25rem', { lineHeight: '1.875rem', fontWeight: '500' }], // 20px
        'subtitle-lg': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }], // 24px
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "scroll-slow": "scroll 40s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333333%)" },
        },
      },
    },
  },
  plugins: [
    forms,
    typography,
    aspectRatio,
  ],
};

export default config;
