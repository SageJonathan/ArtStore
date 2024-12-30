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
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
} satisfies Config;
