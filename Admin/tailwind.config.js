/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        rainbow:
          'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
      },
    },
  },
  plugins: [require('daisyui')],
}
