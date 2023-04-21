/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css");

module.exports = {
  content: ["App.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: ["nativewind/babel"],
  plugins: [nativewind],
};
