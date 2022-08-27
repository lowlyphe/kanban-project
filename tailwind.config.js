/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
      offWhite: "#f4f7fd",
      white: "#ffffff",
      red: "#ea5555",
      offRed: "#ff9898",
      lightBlue: "#a9a4ff",
      blue: "#635fc7",      
      gray: "#e4ebfa",      
      mediumGray: "#828fa3",      
      darkGray: "#3e3f4e",      
      lightBlack: "#2b23c7",      
      mediumBlack: "#20212c",      
      black: "#000112",      
    },
    fontFamily: {
      'sans': "Outfit"
    }
  },
  },
  plugins: [],
}
