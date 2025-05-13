import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1330px",
    },
    extend: {
      colors: {
        primary: "#ff4135",
        secondary: "#fff7f5",
        assent: {
          primary: "#ffdfc4",
          secondary: "#e9eaff",
          tertiary: "#edf0f5",
        },
        grey: "#e8f0f1",
      },
      fontFamily: {
        primary: "Poppins",
      },
      boxShadow: {
        custom1: " 0px 1px 5px rgba(0, 0, 0, 0.3)",
        custom2: " 0px 0px 30px  0px rgba(8 , 73 ,81 , 0.06)",
      },
    },
  },
  plugins: [flowbiteReact],
};
