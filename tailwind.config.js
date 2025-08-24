/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // Makes all Tailwind utilities include !important
  content: ["./src/**/*.{js,jsx,ts,tsx,css,html}", "index.html"], // Adjusted for React
  corePlugins: {
    preflight: true, // Retain this if it's part of your project's configuration
  },
  plugins: [
    require("tailwindcss-logical"),
    require("./src/@core/tailwind/plugin"), // Ensure this plugin exists in the new project
  ],
  theme: {
    extend: {
      extend: {
        animation: {
          draw: "draw 3s linear ",
        },
        keyframes: {
          draw: {
            "0%": {
              strokeDashoffset: "var(--stroke-offset)",
            },
            "100%": {
              strokeDashoffset: "0",
            },
          },
        },
      },
    },
  },
};
