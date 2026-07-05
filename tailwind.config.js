/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ledger: {
          950: '#070B14',
          900: '#0B1220',
          850: '#101A2C',
          800: '#152238',
          700: '#1E2F4B',
          600: '#2C4368',
          500: '#3E5A8C',
          400: '#6E88B8',
          300: '#A3B6DA',
          200: '#CBD6EE',
          100: '#E7ECF9',
          50: '#F5F7FD',
        },
        gold: {
          600: '#B4842E',
          500: '#D4A94C',
          400: '#E2C077',
          300: '#EFDBA6',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'graph-paper': 'linear-gradient(rgba(212,169,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,169,76,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        graph: '32px 32px',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(7,11,20,0.5)',
        glow: '0 0 0 1px rgba(212,169,76,0.25), 0 8px 30px -8px rgba(212,169,76,0.25)',
      },
    },
  },
  plugins: [],
}

