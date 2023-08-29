import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Montserrat, sans-serif",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lemonade"],
  },
} satisfies Config;
