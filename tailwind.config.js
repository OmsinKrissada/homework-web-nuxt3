const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        blurple: "#5865f2",
        cadet: "#2e294e",
        sapphire: "#14617F",
        // 'primary-light': colors.indigo[400],
        // 'secondary-light': colors.gray[700],
        // 'neutral-light': colors.white,
        // 'accent-light': colors.slate[800],
        'primary': colors.indigo[400],
        'secondary': colors.slate[200],
        'neutral': colors.slate[400],
        'accent': colors.slate[800]
      },
      fontFamily: {
        sans: 'Inter',
        inter: 'Inter',
        sarabun: 'Sarabun',
        prompt: 'Prompt',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
};
