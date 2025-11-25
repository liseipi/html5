/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // health: '#C71117'
      }
    },
  },
  plugins: [
    // require('tailwindcss-animated'), // 1.1.2
    // require('@tailwindcss/forms'), // 0.5.9
  ],
}

