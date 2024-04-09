/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0.8)" },
          "40%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        drawLine: {
          to: {
            "stroke-dashoffset": 0
          }
        }
      },
      animation: {
        popIn: "popIn 0.2s linear",
        drawLine: "drawLine 0.7s forwards",
      },
    },
  },
  plugins: [],
};
