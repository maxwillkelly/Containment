const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'gray-600': '#55555C',
      'gray-700': '#3F3F46',
      'gray-800': '#27272A',
      selected: '#299AE0',
    }),
    boxShadow: {
      DEFAULT: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
    },
    extend: {
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
    },
  },
  variants: {},
  plugins: [],
};
