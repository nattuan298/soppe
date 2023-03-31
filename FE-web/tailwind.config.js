const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      flex: {
        2: "1 1 81px",
      },
      colors: {
        ...colors,
        primary: {
          light: "rgba(0, 161, 156, 0.5)", // TODO change to match design
          DEFAULT: "#00a19c", // TODO change to match design
        },
        black: {
          light: "#2d2d2d",
          DEFAULT: "#000",
          dark: "#231F20",
        },
        brown: {
          DEFAULT: "#707070",
          dark: "#414A59",
        },
        red: {
          DEFAULT: "#FF0000",
        },
        orangeSuperLight: {
          DEFAULT: "#FFE2CB",
        },
        orangeLight: {
          DEFAULT: "#FFF1E5",
        },
        blue: {
          DEFAULT: "#0075C9",
          light: "#3391D4",
        },
        orange: {
          DEFAULT: "#FF7500",
          orangeLight: "#FFF1E5",
        },
        orangeYellow: {
          DEFAULT: "#FFBB00",
        },
        textSearch: {
          DEFAULT: "#BCBCBC",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
      },
      extend: {
        backgroundColor: ["active"],
        screens: {
          wide: "1440px",
          large: "1024px",
          medium: "768px",
          sm: "576px",
          // => @media (min-width: 576px) { ... }

          md: "768px",
          // => @media (min-width: 768px) { ... }

          lg: "992px",
          // => @media (min-width: 992px) { ... }

          xl: "1200px",
        },
      },
      width: {
        inherit: "inherit",
        1216: "1216px",
        896: "896px",
        720: "45rem",
        14: "14px",
        signIn: "28rem",
        26: "26rem",
        27: "27rem",
        23.5: "23.5rem",
        21.5: "21.5rem",
        15: "3.75rem",
        34: "8.5rem",
        3.75: "3.75rem",
        3.375: "3.375rem",
        18: "4.5rem",
        4.5: "1.125rem",
      },
      height: {
        50: "50px",
        15: "3.75rem",
        4.375: "4.375rem",
        14: "14px",
        3.375: "3.375rem",
        3.75: "3.75rem",
        30: "30rem",
        62: "62rem",
        "menu-mobile": "calc(100vh - 256px)",
      },
      borderRadius: {
        "1/2": "50%",
        0.625: "0.625rem",
        searchHelpCenter: "7px",
        0.3: "5px",
        footerModal: "10px 10px 0px 0px",
        RadiusFooter: "20px 20px 0px 0px",
      },
      padding: {
        bade: "0px 7px",
        paddingLogin: "30px 36px",
        15: "3.75rem",
      },
      ringColor: {
        orangescm: "#FF7500",
        lighterOrange: "#FF9033",
        error: "#FF0000",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        orange: "#FF7500",
        lighterGray: "#F4F5FA",
        mask: "#707070",
        lighterOrange: "#FF9033",
        whiteHover: "#FEFEFE",
        white: "#FFFFFF",
        blur: "rgba(0, 0, 0, 0.5)",
      }),
      backgroundImage: {
        fade: "linear-gradient(to bottom, rgba(255,0,0,0), rgba(0,0,0,1))",
      },
      boxShadow: {
        s: "0px 1px 2px 0px rgba(112, 112, 112, 0.05)",
        full: "0px 0px 10px #0000001A",
        button: "1px 1px 5px #00000033",
        modal: "-1px -1px 10px #0000001A",
        modalSummary: "0px 0px 15px #0000001A",
        icon: "0px 3px 6px #00000029",
      },
      textColor: {
        lighterGray: "#BCBCBC",
        orange: "#FF7500",
        lightestGray: "#EBEBEB",
        greenLight: "#8DC900",
      },
      placeholderColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
        lightestGray: "#EBEBEB",
      },
      borderColor: {
        lightestGray: "#EBEBEB",
      },
      minHeight: {
        "1/2": "50%",
        62.5: "62.5rem",
      },
      fontWeight: {
        Regular: 400,
      },
      spacing: {
        7.5: "1.875rem",
      },
      fontFamily: {
        kanit: ["Kanit"],
      },
      fontSize: {
        "1.5xl": "1.375rem",
        0.375: "0.375rem",
        0.5: "0.5rem",
        0.625: "0.625rem",
        0.6875: "0.6875rem",
        0.8125: "0.8125rem",
        0.875: "0.875rem",
        1.125: "1.125rem",
        3.5: "2rem",
        s: ["10px", "20px"],
      },
      maxWidth: {
        14.5: "14.5rem",
        950: "950px",
        fit: "fit-content",
      },
      inset: {
        "-18": "-4.4rem",
        "-22": "-5.3rem",
        "-26": "-6.4rem",
        "-27": "-6.8rem",
        "-29": "-7.3rem",
        "small-cart": "calc((100vw - 1216px)/2 - 15px)",
      },
      lineClamp: {
        10: "10",
      },
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
    require("@tailwindcss/line-clamp"),
  ],
};
