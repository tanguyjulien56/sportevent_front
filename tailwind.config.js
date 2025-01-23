/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Spécifie les thèmes que tu souhaites utiliser
  },
  plugins: [require("daisyui")], // Assure-toi d'ajouter DaisyUI comme plugin
};
