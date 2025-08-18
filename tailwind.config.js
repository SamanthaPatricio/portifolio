/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#9d7c2b", // dourado do seu logo
          50: "#fff8e6",
          100: "#f9edc2",
          200: "#efd88a",
          300: "#e2bf54",
          400: "#caa03a",
          500: "#9d7c2b",
          600: "#775f21",
          700: "#544416",
          800: "#3a2f0f",
          900: "#231c08",
        },
      },
    },
  },
  plugins: [],
}
export default {
  darkMode: "class",            // <— ADICIONE
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#9d7c2b",
          50:"#fff8e6",100:"#f9edc2",200:"#efd88a",300:"#e2bf54",
          400:"#caa03a",500:"#9d7c2b",600:"#775f21",700:"#544416",
          800:"#3a2f0f",900:"#231c08",
        },
      },
    },
  },
  plugins: [],
}
