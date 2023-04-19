/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Dongle': ['Dongle', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
  corePlugins: {
    preflight: false
}
}

