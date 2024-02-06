/** @type {import('tailwindcss').Config} */
import { themes } from './src/utils/theme'
module.exports = {
  darkMode: 'class',
  // NOTE: Update this to include the paths to all of your component files.
  // content: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'var(--accent1)'
        },
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        info: 'var(--info)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        muted: 'var(--muted)',
        textprimary: 'var(--text-primary)',
        textsecondary: 'var(--text-secondary)'
      }
    }
  },
  plugins: [
    ({ addBase }) => {
      const defaultColors = themes['blue']['light']
      return addBase({
        root: {
          ...defaultColors
        }
      })
    }
  ]
}
