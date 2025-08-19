/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff7e6",
          100: "#fdecc8",
          200: "#f9d895",
          300: "#f3c162",
          400: "#e9a93b",
          500: "#d9961e",
          600: "#b97917",
          700: "#9d7c2b",   // seu dourado
          800: "#6b4b0f",
          900: "#4a3207",
        },
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.06)" },
    },
  },
  plugins: [],
};
