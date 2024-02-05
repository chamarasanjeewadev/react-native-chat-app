/** @type {import('tailwindcss').Config} */
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
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        baseOne: 'rgb(var(--baseOne))',
        baseTwo: 'rgb(var(--baseTwo))',
        baseThree: 'rgb(var(--baseThree))',
        baseFour: 'rgb(var(--baseFour))'
      }
    }
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        root: {
          '--color-primary': 'rgb(255, 115, 179)',
          '--color-secondary': 'rgb(255,0,0)'
        }
      })
  ]
}
