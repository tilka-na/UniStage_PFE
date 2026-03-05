/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. OBLIGATOIRE POUR LE BOUTON CLAIR/SOMBRE 🌓
  darkMode: 'class', 

  // 2. OBLIGATOIRE POUR QU'ANGULAR LISE TES CLASSES TAILWIND 📄
  content: [
    "./src/**/*.{html,ts}", 
  ],
  
  theme: {
    extend: {
      colors: {
        // --- Mode Sombre (Tes couleurs actuelles) ---
        darkBg: '#0a0f1e',     // Fond principal sombre
        darkCard: '#141b2e',   // Fond des cartes/dossiers sombres
        
        // --- Mode Clair (Nouvelles couleurs) ---
        lightBg: '#f8fafc',    // Un blanc légèrement cassé/gris très clair (pour le fond principal)
        lightCard: '#ffffff',  // Blanc pur (pour faire ressortir les cartes/conteneurs)
        
        // --- Couleurs de Texte ---
        textLightMode: '#0f172a', // Texte gris très foncé/noir pour le mode clair
        textDarkMode: '#f8fafc',  // Texte blanc cassé pour le mode sombre
        
        // --- Couleurs d'Accentuation (Partagées) ---
        gold: '#f59e0b',       // Ton jaune/orange
        blueAccent: '#2563eb'  // Le bleu de tes boutons et titres
      }
    }
  },
  plugins: [],
}