/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors:{
        blurple: '#5865f2'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
