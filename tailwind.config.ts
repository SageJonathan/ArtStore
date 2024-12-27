import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: '#e7e5e4',
      },
      fontFamily: {
        merriweather: ['var(--font-merriweather)', 'serif'], 
        playfair: ['var(--font-playfair)', 'serif'],         
      },
    },
  },
  plugins: [],
} satisfies Config;
