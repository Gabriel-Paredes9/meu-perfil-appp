

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        'segoe': ['Segoe UI']
      }
    }
  },
  plugins: [],
} satisfies Config;

export default config;