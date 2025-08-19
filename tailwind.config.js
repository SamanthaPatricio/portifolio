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
          100: "#fef6cc",
          200: "#edd099",
          300: "#d1b466",
          400: "#c39b33",
          500: "#9d7c2b",
          600: "#7a6021",
          700: "#5a5818",
          800: "#3d2a0f",
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
