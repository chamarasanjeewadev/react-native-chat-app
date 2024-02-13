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
        success: 'var(--success)',
        info: 'var(--info)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        shadow: 'var(--shadow)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        botchat: 'var(--bot-chat)',
        botchatbg: 'var(--bot-chat-bg)',
        userchat: 'var(--user-chat)',
        userchatbg: 'var(--user-chat-bg)',
        chatbuttonbg: 'var(--chat-button-bg)',
        chatbutton: 'var(--chat-button)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        }
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
