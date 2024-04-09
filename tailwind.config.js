/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0.8)" },
          "40%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        drawLine: {
          to: {
            "stroke-dashoffset": 0
          }
        }
      },
      animation: {
        popIn: "popIn 0.1s linear",
        drawLine: "drawLine 1s forwards",
      },
    },
  },
  plugins: [],
};
