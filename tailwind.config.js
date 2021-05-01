// const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.tsx'],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'gray-600': '#55555C',
      'gray-700': '#3F3F46',
      'gray-800': '#27272A',
      disabled: '#2E2E36',
      selected: '#299AE0',
    }),
    boxShadow: {
      DEFAULT: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
    },
    extend: {
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
    },
  },
  plugins: [],
};
