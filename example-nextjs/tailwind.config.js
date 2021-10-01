module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'gray-875': '#1A1A1A',
        'gray-825': '#252525',
        'gray-750': '#323232',
        'gray-450': '#8C8C8C',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
