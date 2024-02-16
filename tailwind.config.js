/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        2: '1 8 1'
      },
      minHeight: {
        0: '400px'
      }
    }
  },
  plugins: []
}
