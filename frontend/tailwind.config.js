/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#ffffff",
        secondary: "#ffed4a",
        danger: "#e3342f",
      },
      backgroundColor: {
        primary: "#FF8A8A",
        secondary: "#F4DEB3",
        tertiary: "#F4F4F4",
      },
      colors: {
        primary: "#FF8A8A",
        secondary: "#F4DEB3",
        tertiary: "#F4F4F4",
        "bg-btn": "#f1f1f1",
        "app-green": "#92ff92",
        "app-dark-green": "#004D40",
        "light-gray": "#F3F1F1",
        "dark-gray": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
