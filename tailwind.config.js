const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'gray-700': '#3F3F46',
      selected: '#299AE0',
    }),
    boxShadow: {
      DEFAULT: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
    },
  },
  variants: {},
  plugins: [],
};
