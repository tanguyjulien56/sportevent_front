/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["lofi", "black"],
    darkTheme: "black",
  },
  plugins: [require("daisyui")],
};
