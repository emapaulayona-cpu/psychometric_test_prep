/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'system-ui', 'sans-serif'],
        display: ['Rubik', 'Assistant', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0faf4',
          100: '#dcf3e4',
          200: '#bce6cd',
          300: '#8ed3a9',
          400: '#57b87d',
          500: '#329c5c',
          600: '#237e48',
          700: '#1d643b',
          800: '#1a5032',
          900: '#16422b',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 42, 27, 0.06), 0 8px 24px rgba(16, 42, 27, 0.05)',
        press: '0 1px 2px rgba(16, 42, 27, 0.08), inset 0 2px 6px rgba(16, 42, 27, 0.08)',
        cta: '0 10px 24px -6px rgba(220, 38, 38, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.25s ease-out',
        'pulse-soft': 'pulse-soft 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
