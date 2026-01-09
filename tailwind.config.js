/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        "white-opacity": "rgba(255, 255, 255, 0.68)",
        primary: {
          50: "#9FD416",
          40: "#A9E119",
          30: "#D1F27D",
          20: "#E3FBA6",
          10: "#F1FFCE",
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
          100: "#E9ECEF",
          50: "#F2F4F6",
        },
        screen: {
          0: "#FCFDFF",
        },
        alert: {
          50: "#E84A4A",
        },
      },
      fontSize: {
        h1_24: ["24px", { lineHeight: "140%" }],
        h2_20: ["20px", { lineHeight: "140%" }],
        body_18: ["18px", { lineHeight: "140%" }],
        body_16: ["16px", { lineHeight: "140%" }],
        body_14: ["14px", { lineHeight: "140%" }],
        body_12: ["12px", { lineHeight: "140%" }],
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
        "footer-shadow": "0px -4px 10px rgba(183, 183, 183, 0.  1)",
        soft: "0px 4px 10px rgba(183, 183, 183, 0.1)",
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
