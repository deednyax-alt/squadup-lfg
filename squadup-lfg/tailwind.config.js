/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gaming: {
          dark: '#0b0e14',
          card: '#121824',
          cardHover: '#182030',
          border: '#1f293d',
          accent: '#8b5cf6',
          cyan: '#06b6d4',
          pink: '#ec4899',
          green: '#10b981',
          gold: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.35)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
