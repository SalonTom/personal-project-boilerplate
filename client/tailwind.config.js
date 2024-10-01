/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // Toasts
        'toast-info-bg': colors.blue['100'],
        'toast-info-text': colors.blue['700'],

        'toast-warning-bg': colors.amber['100'],
        'toast-warning-text': colors.amber['700'],

        'toast-danger-bg': colors.red['100'],
        'toast-danger-text': colors.red['700'],

        'toast-success-bg': colors.green['100'],
        'toast-success-text': colors.green['700'],
      }
    },
  },
  plugins: [],
}

