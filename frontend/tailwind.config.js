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
          DEFAULT: '#020617',
          lighter: '#0f172a',
          card: 'rgba(15, 23, 42, 0.6)',
        },
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          glow: 'rgba(59, 130, 246, 0.5)',
        },
        accent: {
          green: '#10b981',
          red: '#ef4444',
          cyan: '#06b6d4',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ai-gradient': 'linear-gradient(to bottom right, #020617, #0f172a, #020617)',
        'premium-gradient': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6' },
          'to': { boxShadow: '0 0 20px #06b6d4, 0 0 40px #06b6d4' },
        }
      }
    },
  },
  plugins: [],
}
