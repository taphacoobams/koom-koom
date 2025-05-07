/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',  // Couleur principale (indigo)
        'secondary': '#fbbf24', // Couleur du badge PRO (amber)
      },
      boxShadow: {
        'box': '4px 4px 10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
