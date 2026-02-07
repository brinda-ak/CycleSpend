/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#5B1A2E',
        cranberry: '#8B2942',
        mauve: '#7A4B5E',
        'dusty-rose': '#9E6B73',
        terracotta: '#B56B4A',
        tan: '#D4B5A0',
        'dark-tan': '#C4A088',
        'warm-bg': '#F0E6DD',
        espresso: '#2C1A1F',
        'dark-mode': '#1E1015',
        'rewards-green': '#6B7F5E',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        card: '16px',
        cell: '8px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(44, 26, 31, 0.10)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
