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
        lightBg: '#f8fafc',    // Un blanc légèrement cassé/gris très clair (pour le fond principal)
        lightCard: '#ffffff',
         textLightMode: '#0f172a', // Texte gris très foncé/noir pour le mode clair
        textDarkMode: '#f8fafc',  // Texte blanc cassé pour le mode sombre
        
        gold: '#f59e0b',
        blueAccent: '#2563eb'
      }
    }
  },
  plugins: []
}
