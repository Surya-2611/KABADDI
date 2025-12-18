/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          900: '#0B0F14',
          800: '#121824',
          700: '#161C26',
          border: '#252D3A',
          text: {
            primary: '#EAECEF',
            secondary: '#A9B1BD'
          }
        },
        rouge: {
          500: '#C23B50',
          400: '#E1526D'
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#38BDF8'
      },
      backgroundImage: {
        'btn-gradient': 'linear-gradient(8deg, #C23B50, #E1526D)',
        'card-gradient': 'linear-gradient(180deg, #121824, #161C26)'
      }
    }
  },
  plugins: []
};


