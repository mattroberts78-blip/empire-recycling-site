/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#60B840",
          green2: "#38B048",
          dark: "#106030"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)"
      },
      backgroundImage: {
        "brushed-metal": "repeating-linear-gradient( to bottom, #f3f4f6, #f3f4f6 2px, #eceef1 2px, #eceef1 4px)"
      }
    },
  },
  plugins: [],
}
