/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
            transform: "translateY(10px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out", // Adjust the duration as needed
      },
      screens: {
        // => @media (max-width: 479px)
        xs: { max: "479px" }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff3637",
        },
      },
    ],
  },
};
