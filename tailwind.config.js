/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF8E6",
          700: "#9d7c2b",
        },
      },
      boxShadow: {
        soft: "0 8px 22px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
