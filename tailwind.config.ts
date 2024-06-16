/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        post: '0px 4px 16px rgba(17, 17, 26, 0.05), 0px 8px 32px rgba(17, 17, 26, 0.05)',
        input: 'inset 1px 0 0 black, inset 0 1px 0 black, inset -1px 0 0 black, inset 0 -1px 0 black'
      }
    },
  },
  plugins: [],
}

