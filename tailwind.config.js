/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", 
      "./pages/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          iplPurple: '#4B0082',
          iplBlue: '#1E90FF',
          iplYellow: '#FFD700',
        },
      },
    },
    plugins: [],
  }