const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'gray-700': '#3F3F46',
    }),
  },
  variants: {},
  plugins: [],
};
