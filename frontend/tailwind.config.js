/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c2d6b',
          950: '#082f49',
        },
        dark: {
          bg: '#0f172a',
          'bg-secondary': '#1e293b',
          'card': '#1a2e4a',
          'card-hover': '#1f3a52',
        }
      },
      backgroundColor: {
        'gradient-primary': 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
      },
      backgroundImage: {
        'gradient-ai': 'linear-gradient(to bottom right, #1e1b4b, #1e3a8a, #0c4a6e)',
        'gradient-hero': 'linear-gradient(to right, #1e3a8a, #1e293b, #0c4a6e)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            opacity: '.8',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
