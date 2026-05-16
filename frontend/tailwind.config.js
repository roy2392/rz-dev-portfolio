import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'border-spin': {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(12px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(12px) rotate(-360deg)' },
        },
        'sound-bar': {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 4px rgba(168,85,247,0.4)' },
          '50%': { textShadow: '0 0 16px rgba(168,85,247,0.8), 0 0 32px rgba(168,85,247,0.4)' },
        },
      },
      animation: {
        'border-spin': 'border-spin 4s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'orbit': 'orbit 1.5s linear infinite',
        'sound-bar': 'sound-bar 0.8s ease-in-out infinite',
        'slide-up-fade': 'slide-up-fade 0.5s ease-out forwards',
        'text-glow': 'text-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-grid-pattern': {
          'background-image': 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          'background-size': '20px 20px',
        },
      })
    }),
  ],
}
