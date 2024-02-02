// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {},
//     colors: {
//       black: '#292930',
//       white: '#fff',

//       'mila-gray': {
//         25: '#020617',
//         50: '#0F172A',
//         100: '#1E293B'
//       },

//       violet: {
//         DEFAULT: 'var(--color-violet-500)',
//         50: 'var(--color-violet-50)',
//         100: 'var(--color-violet-100)',
//         200: 'var(--color-violet-200)',
//         300: 'var(--color-violet-300)',
//         400: 'var(--color-violet-400)',
//         500: 'var(--color-violet-500)',
//         600: 'var(--color-violet-600)',
//         700: 'var(--color-violet-700)',
//         800: 'var(--color-violet-800)',
//         900: 'var(--color-violet-900)'
//       },

//       indigo: {
//         DEFAULT: 'var(--color-indigo-500)',
//         50: 'var(--color-indigo-50)',
//         100: 'var(--color-indigo-100)',
//         200: 'var(--color-indigo-200)',
//         300: 'var(--color-indigo-300)',
//         400: 'var(--color-indigo-400)',
//         500: 'var(--color-indigo-500)',
//         600: 'var(--color-indigo-600)',
//         700: 'var(--color-indigo-700)',
//         800: 'var(--color-indigo-800)',
//         900: 'var(--color-indigo-900)'
//       },

//       pink: {
//         DEFAULT: '#FFA6BB',
//         50: 'var(--color-pink-50)',
//         100: 'var(--color-pink-100)',
//         200: 'var(--color-pink-200)',
//         300: 'var(--color-pink-300)',
//         400: 'var(--color-pink-400)',
//         500: 'var(--color-pink-500)',
//         600: 'var(--color-pink-600)',
//         700: 'var(--color-pink-700)',
//         800: 'var(--color-pink-800)',
//         900: 'var(--color-pink-900)',
//         950: 'var(--color-pink-950)'
//       },

//       green: {
//         DEFAULT: '#92dfc3',
//         50: 'var(--color-green-50)',
//         100: 'var(--color-green-100)',
//         200: 'var(--color-green-200)',
//         300: 'var(--color-green-300)',
//         400: 'var(--color-green-400)',
//         500: 'var(--color-green-500)',
//         600: 'var(--color-green-600)',
//         700: 'var(--color-green-700)',
//         800: 'var(--color-green-800)',
//         900: 'var(--color-green-900)'
//       },

//       gray: {
//         DEFAULT: 'var(--color-gray-300)',
//         50: 'var(--color-gray-50)',
//         100: 'var(--color-gray-100)',
//         200: 'var(--color-gray-200)',
//         300: 'var(--color-gray-300)',
//         400: 'var(--color-gray-400)',
//         500: 'var(--color-gray-500)',
//         600: 'var(--color-gray-600)',
//         700: 'var(--color-gray-700)',
//         800: 'var(--color-gray-800)',
//         900: 'var(--color-gray-900)'
//       },

//       blue: {
//         DEFAULT: 'var(--color-blue-300)',
//         25: '#F3F8FF',
//         50: 'var(--color-blue-50)',
//         100: 'var(--color-blue-100)',
//         200: 'var(--color-blue-200)',
//         300: 'var(--color-blue-300)',
//         400: 'var(--color-blue-400)',
//         500: 'var(--color-blue-500)',
//         600: 'var(--color-blue-600)',
//         700: 'var(--color-blue-700)',
//         800: 'var(--color-blue-800)',
//         900: 'var(--color-blue-900)',
//         950: 'var(--color-blue-950)'
//       },

//       yellow: {
//         DEFAULT: '#FBF093',
//         50: 'var(--color-yellow-50)',
//         100: 'var(--color-yellow-100)',
//         200: 'var(--color-yellow-200)',
//         300: 'var(--color-yellow-300)',
//         400: 'var(--color-yellow-400)',
//         500: 'var(--color-yellow-500)',
//         600: 'var(--color-yellow-600)',
//         700: 'var(--color-yellow-700)',
//         800: 'var(--color-yellow-800)',
//         900: 'var(--color-yellow-900)',
//         950: 'var(--color-yellow-950)'
//       },

//       red: {
//         DEFAULT: 'var(--color-red-500)',
//         50: 'var(--color-red-50)',
//         100: 'var(--color-red-100)',
//         200: 'var(--color-red-200)',
//         300: 'var(--color-red-300)',
//         400: 'var(--color-red-400)',
//         500: 'var(--color-red-500)',
//         600: 'var(--color-red-600)',
//         700: 'var(--color-red-700)',
//         800: 'var(--color-red-800)',
//         900: 'var(--color-red-900)'
//       },

//       purple: {
//         DEFAULT: 'var(--color-purple-500)',
//         50: 'var(--color-purple-50)',
//         100: 'var(--color-purple-100)',
//         200: 'var(--color-purple-200)',
//         300: 'var(--color-purple-300)',
//         400: 'var(--color-purple-400)',
//         500: 'var(--color-purple-500)',
//         600: 'var(--color-purple-600)',
//         700: 'var(--color-purple-700)',
//         800: 'var(--color-purple-800)',
//         900: 'var(--color-purple-900)',
//         950: 'var(--color-purple-950)'
//       },

//       slate: {
//         DEFAULT: 'var(--color-slate-500)',
//         50: 'var(--color-slate-50)',
//         100: 'var(--color-slate-100)',
//         200: 'var(--color-slate-200)',
//         300: 'var(--color-slate-300)',
//         400: 'var(--color-slate-400)',
//         500: 'var(--color-slate-500)',
//         600: 'var(--color-slate-600)',
//         700: 'var(--color-slate-700)',
//         800: 'var(--color-slate-800)',
//         900: 'var(--color-slate-900)'
//       },

//       sky: {
//         DEFAULT: 'var(--color-sky-500)',
//         50: 'var(--color-sky-50)',
//         100: 'var(--color-sky-100)',
//         200: 'var(--color-sky-200)',
//         300: 'var(--color-sky-300)',
//         400: 'var(--color-sky-400)',
//         500: 'var(--color-sky-500)',
//         600: 'var(--color-sky-600)',
//         700: 'var(--color-sky-700)',
//         800: 'var(--color-sky-800)',
//         900: 'var(--color-sky-900)'
//       },

//       orange: {
//         DEFAULT: 'var(--color-orange-500)',
//         50: '#fff7ed',
//         100: 'var(--color-orange-100)',
//         200: 'var(--color-orange-200)',
//         300: 'var(--color-orange-300)',
//         400: 'var(--color-orange-400)',
//         500: 'var(--color-orange-500)',
//         600: 'var(--color-orange-600)',
//         700: 'var(--color-orange-700)',
//         800: 'var(--color-orange-800)',
//         900: '#7c2d12',
//         950: 'var(--color-orange-950)'
//       },

//       emerald: {
//         DEFAULT: 'var(--color-emerald-500)',
//         50: 'var(--color-emerald-50)',
//         100: 'var(--color-emerald-100)',
//         200: 'var(--color-emerald-200)',
//         300: 'var(--color-emerald-300)',
//         400: 'var(--color-emerald-400)',
//         500: 'var(--color-emerald-500)',
//         600: 'var(--color-emerald-600)',
//         700: 'var(--color-emerald-700)',
//         800: 'var(--color-emerald-800)',
//         900: 'var(--color-emerald-900)',
//         950: 'var(--color-emerald-950)'
//       }
//     },

//     fontFamily: {
//       chinese: 'Noto Sans SC',
//       japanese: 'Noto Sans JP'
//     }
//   },

//   plugins: []
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // NOTE: Update this to include the paths to all of your component files.
  // content: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'var(--accent1)'
        },
        baseOne: 'var(--baseOne)',
        baseTwo: 'var(--baseTwo)',
        baseThree: 'var(--baseThree)',
        baseFour: 'var(--baseFour)'
      }
    }
  },
  plugins: []
}
