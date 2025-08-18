/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f7f3e6',
          100: '#efe6cc',
          200: '#e0cd99',
          300: '#d1b466',
          400: '#c39b33',
          500: '#9d7c2b', // principal
          600: '#7a6021',
          700: '#584518',
          800: '#362a0f',
          900: '#1b1507',
        },
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,.08)',
      },
    },
  },
  plugins: [],
}
