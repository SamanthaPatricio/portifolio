/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#9d7c2b",
          50: "#faf6ee",
          100: "#f4eddc",
          200: "#e8d9b8",
          300: "#d9c089",
          400: "#c8a55b",
          500: "#b88c3a",
          600: "#9d7c2b",
          700: "#7d6221",
          800: "#5a4718",
          900: "#3b2f10"
        }
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.08)" }
    }
  },
  plugins: []
};
