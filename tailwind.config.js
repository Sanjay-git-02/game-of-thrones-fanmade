/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gotBackground: '#0B0B0B',
        gotCharcoal: '#151515',
        gotGold: '#C9A227',
        gotCrimson: '#7A0E18',
        gotIvory: '#F5F5F5',
        gotWildfire: '#00FF66', // Wildfire green toxic accent
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cinzelDeco: ['"Cinzel Decorative"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' }
        }
      }
    },
  },
  plugins: [],
}
