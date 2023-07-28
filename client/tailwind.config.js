/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-color': '#403a51',
        'custom-color2': '#ffcc00',
        'custom-color3': '#00ffcc',
        // Agrega tantos colores personalizados como desees
      },
    },
  },
  plugins: [],
};

