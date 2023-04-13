const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  important: false,
  theme: {
    colors: {
      ...colors,
      primary: {
        light: "rgba(0, 161, 156, 0.5)", // TODO change to match design
        DEFAULT: "#00a19c", // TODO change to match design
      },
      black: {
        light: "#2d2d2d",
        DEFAULT: "#000",
        primary: "#231F20",
      },
      orange: {
        light: "#FF7500",
        hover: "#FF9033",
        DEFAULT: "#F8B61B",
      },
      red: {
        light: "#FF0000",
      },
      blue: {
        DEFAULT: "#0075C9",
      },
      purple: {
        primary: "#311339",
      },
      graySearch: {
        light: "#F4F5FA",
      },
      textSearch: {
        light: "#231F20",
      },
      gray: {
        primary: "#BCBCBC",
        dark: "#707070",
      },
    },
    screens: {
      "2xl": "1536px",
      wide: "1440px",
      desktop: "1280px",
      large: "1024px",
      medium: "768px",
    },

    extend: {
      backgroundColor: ["active"],
      backgroundColor: (theme) => ({
        ...theme("colors"),
        orangeSuperLight: "#FFE2CB",
      }),
      width: {
        "3/9": "30%",
        15: "3.75rem",
        28: "28rem",
        84: "21.4rem",
        "97/100": "97%",
        "62/100": "62%",
        "38/100": "38%",
      },
      height: {
        15: "3.75rem",
        30: "30rem",
        54: "54rem",
        58: "58rem",
        56: "56rem",
        84: "21.4rem",
        19: "4.75rem",
        'full': "100%"
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "98/100": "98vh",
        full: "100%",
      },
      spacing: {
        7.5: "1.875rem",
      },
      fontFamily: {
        kanit: ["Kanit"],
      },
      borderRadius: {
        primary: "10px",
        navbar: "0.625rem",
        search: "0.4375rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        navbar: "0px 0px 15px #00000029",
        headerSignIn: "0px 3px 6px #00000029",
        formSignIn: "0px 0px 10px #0000001A",
        boxWrapper: "0px 0px 10px #7979791A"
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        navbar: "#707070",
        lightestGray: "#EBEBEB",
      }),
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled"],
      textColor: ["disabled"],
      borderWidth: ["last"],
      margin: ["first", "last"],
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
