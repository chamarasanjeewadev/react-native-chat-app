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
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        baseOne: 'rgb(var(--baseOne))',
        baseTwo: 'rgb(var(--baseTwo))',
        baseThree: 'rgb(var(--baseThree))',
        baseFour: 'rgb(var(--baseFour))'
      }
    }
  },
  plugins: [({ addBase }) => addBase({ root: { '--color-primary': '51 51 255' } })]
}
