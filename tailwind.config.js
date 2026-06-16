/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#08080F',
          100: '#0F0F1A',
          200: '#15151F',
          300: '#1E1E2D',
          400: '#2A2A3D',
        },
        primary: {
          DEFAULT: '#7C6FFF',
          light: '#9B8FFF',
          dark: '#6250CC',
        },
        mint: {
          DEFAULT: '#00E5B4',
          light: '#33EDC8',
          dark: '#00B890',
        },
        gold: {
          DEFAULT: '#FFB347',
          light: '#FFC670',
          dark: '#E69900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Cairo', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #7C6FFF, 0 0 10px #7C6FFF, 0 0 15px #7C6FFF' },
          '100%': { boxShadow: '0 0 10px #7C6FFF, 0 0 20px #7C6FFF, 0 0 30px #7C6FFF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
