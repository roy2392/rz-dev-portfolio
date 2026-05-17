import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#e5e1d7',
          light: '#f5f2ea',
          dark: '#d5d1c7',
          shadow: '#bcb8ae',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#333333',
          muted: '#555555',
          faint: '#888888',
        },
        accent: {
          DEFAULT: '#0099e5',
          dark: '#0077b3',
          darker: '#005c8a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        body: ['PT Sans', 'Helvetica', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'retro': '0 4px 0 0 #bcb8ae, 0 4px 0 2px #1a1a1a',
        'retro-hover': '0 6px 0 0 #bcb8ae, 0 6px 0 2px #1a1a1a',
        'retro-accent': '0 4px 0 0 rgba(0,153,229,0.35), 0 4px 0 2px #0099e5',
      },
    },
  },
  plugins: [],
}
