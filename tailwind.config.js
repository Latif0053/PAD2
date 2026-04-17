import { addDynamicIconSelectors } from '@iconify/tailwind';
import flyonui from 'flyonui';
import tailwindcssIntersect from 'tailwindcss-intersect';
import tailwindcssMotion from 'tailwindcss-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js" 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#41a6c2',
        secondary: '#36a3b9'
      }
    }
  },
  plugins: [
    flyonui,
    tailwindcssIntersect,
    tailwindcssMotion,
    addDynamicIconSelectors()
  ],
}