/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#9d7c2b",
          50: "#fff7e6",
          100: "#efe6cc",
          200: "#e0cd99",
          300: "#d1b466",
          400: "#c39b33",
          500: "#9d7c2b",
          600: "#775f21",
          700: "#544416",
          800: "#3a2f0f",
          900: "#231c08",
        },
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
