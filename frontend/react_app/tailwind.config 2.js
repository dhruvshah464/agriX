/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f3f8f0",
          100: "#dcebcf",
          200: "#bdd8a7",
          300: "#8fbc72",
          400: "#5f9547",
          500: "#3f7033",
          600: "#315929",
          700: "#254321",
          800: "#172d16",
          900: "#0d1a0c"
        },
        clay: {
          500: "#b26d3b"
        }
      },
      boxShadow: {
        panel: "0 20px 40px -18px rgba(25, 63, 40, 0.35)"
      }
    }
  },
  plugins: []
};
