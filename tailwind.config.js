/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
};
