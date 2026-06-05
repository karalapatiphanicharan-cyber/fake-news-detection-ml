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
          DEFAULT: '#0a0a0a',
          lighter: '#1a1a1a',
          card: 'rgba(26, 26, 26, 0.6)',
        },
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        accent: {
          green: '#10b981',
          red: '#ef4444',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ai-gradient': 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a, #0a0a0a)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
