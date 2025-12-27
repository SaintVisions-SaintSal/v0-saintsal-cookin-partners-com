/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        gold2: '#F4D03F',
        gold3: '#B8960C',
        bg: '#0a0a0a',
        bg2: '#111111',
        bg3: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
