/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0a0f1e',
        darkCard: '#141b2e',
        gold: '#f59e0b',
        blueAccent: '#2563eb'
      }
    }
  },
  plugins: []
}
