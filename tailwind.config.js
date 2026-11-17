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
          maroon: 'var(--brand-maroon, #4A121A)',
          maroonDark: 'var(--brand-maroon-dark, #380D13)',
          maroonLight: 'var(--brand-maroon, #4A121A)',
          crimson: 'var(--brand-maroon, #4A121A)',
          ruby: 'var(--brand-maroon-dark, #380D13)',
          terracotta: '#A6432D',
          marigold: '#F4A228',
          saffron: '#D97706',
          turmeric: '#CA8A04',
          indigo: '#1E2B45',
          peacock: '#0D5C75',
          emerald: '#1A5336',
          sand: 'var(--brand-sand, #F5EFE6)',
          sandBorder: 'var(--brand-sand-border, #E2D7C7)',
          sandLight: '#FAF6F0',
          cream: 'var(--brand-cream, #FBF8F3)',
          silk: 'var(--brand-sand, #F5EFE6)',
          gold: '#C29D59',
          antiqueGold: '#9E7B3B',
          charcoal: 'var(--brand-charcoal, #241E1C)',
          muted: 'var(--brand-muted, #6E6259)',
          darkSurface: '#191514',
          darkCard: '#241F1E'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
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
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(74, 18, 26, 0.05)',
        'luxury': '0 20px 40px -15px rgba(74, 18, 26, 0.08)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'maroon-glow': '0 0 25px rgba(74, 18, 26, 0.25)',
      }
    },
  },
  plugins: [],
}
