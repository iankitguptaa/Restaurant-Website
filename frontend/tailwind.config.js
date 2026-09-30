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
        brand: {
          DEFAULT: '#FF5E1B',
          hover: '#E04B0E',
          soft: '#FFF0E6',
          peach: '#FFF5EB',
          mint: '#E0F2F1',
          sage: '#E8F5E9',
          pink: '#FFEBEE',
          lavender: '#F3E5F5',
        },
        cream: {
          DEFAULT: '#FFF9F2',
          card: '#FFFFFF',
          dark: '#12100E',
          'dark-card': '#1E1B18',
        },
        ink: {
          DEFAULT: '#1F1F1F',
          dark: '#F5F2EE',
        },
        body: {
          DEFAULT: '#5E5854',
          dark: '#B0A8A0',
        },
        mute: {
          DEFAULT: '#999088',
          dark: '#736B63',
        },
        hairline: {
          DEFAULT: '#F0E8DF',
          dark: '#2A2520',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '3xl': '24px',
        '2xl': '20px',
        'xl': '16px',
        'pill': '100px',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(255, 94, 27, 0.06)',
        'warm-md': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'warm-lg': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'orange-glow': '0 8px 24px rgba(255, 94, 27, 0.25)',
      }
    },
  },
  plugins: [],
}
