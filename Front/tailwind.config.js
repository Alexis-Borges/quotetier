const { blackA, violet, mauve } = require('@radix-ui/colors');


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...violet,
        ...blackA,
        ...mauve,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}