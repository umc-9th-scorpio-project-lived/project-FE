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
          900: "#1A1E22",
          800: "#33373B",
          700: "#4C5054",
          600: "#65696D",
          500: "#7E8286",
          400: "#979B9F",
          300: "#B0B4B8",
          200: "#C9CDD1",
          100: "#E7E7E7",
          50: "F2F4F6",
          0: "FFFFFF",
        },
        screen: {
          0: "FCFDFF",
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
      boxShadow: {
        "footer-shadow": "0px -4px 10px rgba(183, 183, 183, 0.1)",
      },
      backgroundImage: {
        // 아이콘
        home: "url('/icons/home.svg')",
        tree: "url('/icons/tree.svg')",
        community: "url('/icons/community.svg')",
        user: "url('/icons/user.svg')",
        timer: "url('/icons/timer.svg')",
        alarm: "url('/icons/alarm.svg')",
        calender: "url('/icons/calendar.svg')",
        write: "url('/icons/write.svg')",
      },
    },
    screens: {
      xs: "405px",
      sm: "470px",
    },
  },
  plugins: [],
};
