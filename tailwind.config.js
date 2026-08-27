/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // Solo para Casos de Éxito (constelación) — el resto del sitio sigue en Inter.
        display: ["Fraunces", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
