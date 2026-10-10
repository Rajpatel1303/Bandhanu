/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        heritage: {
          crimson: '#9B111E',
          ruby: '#800020',
          terracotta: '#C85A32',
          marigold: '#F4A228',
          saffron: '#FF9933',
          turmeric: '#E6A117',
          indigo: '#1F2942',
          peacock: '#0D5C75',
          emerald: '#1A5336',
          sand: '#F7F3E9',
          cream: '#FFFDF9',
          silk: '#F5EFE6',
          gold: '#D4AF37',
          antiqueGold: '#B38B2D',
          charcoal: '#18181B',
          darkSurface: '#121214',
          darkCard: '#1E1E24'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'wave': 'wave 10s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) rotate(1deg)' },
          '100%': { transform: 'scale(1) rotate(-1deg)' },
        }
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(212, 175, 55, 0.2)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(212, 175, 55, 0.3)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'crimson-glow': '0 0 25px rgba(155, 17, 30, 0.25)',
      }
    },
  },
  plugins: [],
}
