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
        canvas: {
          DEFAULT: '#fafafa',
          elevated: '#ffffff',
          dark: '#0a0a0a',
          'dark-elevated': '#121212',
        },
        ink: {
          DEFAULT: '#171717',
          dark: '#ededed',
        },
        body: {
          DEFAULT: '#4d4d4d',
          dark: '#a1a1a1',
        },
        mute: {
          DEFAULT: '#8f8f8f',
          dark: '#707070',
        },
        faint: {
          DEFAULT: '#a1a1a1',
          dark: '#444444',
        },
        hairline: {
          DEFAULT: '#ebebeb',
          soft: '#f2f2f2',
          dark: '#222222',
          'dark-soft': '#1a1a1a',
        },
        accent: {
          blue: '#0070f3',
          'blue-deep': '#0761d1',
          'blue-soft': '#d3e5ff',
          violet: '#7928ca',
          cyan: '#50e3c2',
          pink: '#ff0080',
          magenta: '#eb367f',
          warning: '#f5a623',
          error: '#ee0000',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Geist', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'display-xl': '-2.4px',
        'heading-lg': '-1.28px',
        'heading-md': '-0.4px',
        'label-sm': '-0.28px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'pill-category': '64px',
        'pill': '100px',
      },
      boxShadow: {
        'whisper': '0px 1px 2px rgba(0, 0, 0, 0.04)',
        'floating': '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px -4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
