/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066b2",
        secondary: "#ffffff",
        primaryDark: "#1e9ef0",
        primaryLight: "#4fc3f7",
      },
    },
  },
  plugins: [],
};
