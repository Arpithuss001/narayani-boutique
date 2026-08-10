/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF3E7',
        ivory: '#FFFCF6',
        maroon: {
          DEFAULT: '#6E1423',
          dark: '#460B15',
          light: '#8C2233',
        },
        gold: {
          DEFAULT: '#C99B3E',
          light: '#E4C77A',
          dark: '#9C7526',
        },
        blush: '#F3D7DC',
        ink: '#2B1210',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, transparent, #C99B3E, transparent)',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(70, 11, 21, 0.25)',
        soft: '0 4px 18px rgba(70, 11, 21, 0.10)',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        sway: 'sway 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
