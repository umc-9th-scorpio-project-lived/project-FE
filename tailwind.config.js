/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        "white-opacity": "rgba(255, 255, 255, 0.68)",
        primary: {
          900: "#8FC600",
          800: "#B2EF16",
          700: "#BCEF37",
          600: "#D0F663",
          500: "#E2FF8F",
          400: "#EDFFBE",
          300: "#F0F7D6",
        },
        sub: {
          900: "#94CEE5",
          800: "#AAE6FF",
          700: "#D0F1FF",
          600: "#F6FCFF",
        },
        gray: {
          900: "#080808",
          800: "#373737",
          700: "#494949",
          600: "#626262",
          500: "#868686",
          400: "#A8A8A8",
          300: "#CACACA",
          200: "#E7E7E7",
          100: "#F2F2F2",
          0: "FFFFFF",
        },
      },
      fontSize: {
        h1: ["32px", { lineHeight: "140%" }],
        h2: ["24px", { lineHeight: "140%" }],
        subtitle1: ["18px", { lineHeight: "140%" }],
        subtitle2: ["16px", { lineHeight: "140%" }],
        body1: ["16px", { lineHeight: "140%" }],
        body2: ["14px", { lineHeight: "140%" }],
        button: ["12px", { lineHeight: "140%" }],
        caption1: ["14px", { lineHeight: "140%" }],
        caption2: ["11px", { lineHeight: "140%" }],
      },
      textColor: (theme) => ({
        ...theme("colors"),
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
      }),
      fontFamily: {
        suite: ["SUITE Variable", "SUITE", "system-ui", "sans-serif"],
      },
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
    },
    screens: {
      xs: "405px",
      sm: "470px",
    },
  },
  plugins: [],
};
