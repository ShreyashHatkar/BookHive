/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      text: '#0b0a0a',
      background: '#f4f4f4',
      primary: '#9cd8a6',
      secondary: '#daf1de',
      accent: '#47b85a',
      red: '#c30c1e'
    }
  },
  plugins: [],
}