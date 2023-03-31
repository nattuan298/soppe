import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7500",
      contrastText: "#FFFFFF",
      dark: "#FF9033",
      light: "#FF7500",
    },
    secondary: {
      main: "#0075C9",
      contrastText: "#FFFFFF",
      dark: "#FF9033",
      light: "#0075C9",
    },
  },
  typography: {
    fontFamily: "Kanit",
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: "#EBEBEB",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#FF7500",
        },
      },
      notchedOutline: {
        borderColor: "#EBEBEB",
        borderWidth: 1,
        borderRadius: 5,
      },
    },
    MuiInputBase: {
      input: {
        "&::placeholder": {
          color: "#EBEBEB",
          opacity: 1,
          fontSize: "0.875rem",
        },

        "&$disabled": {
          color: "#BCBCBC",
        },
      },
    },
    MuiPaper: {
      outlined: {
        border: "1px solid #EBEBEB",
      },
    },
    MuiButton: {
      outlinedPrimary: {
        borderColor: "#FF7500",

        "&:hover": {
          backgroundColor: "#FFFFFF",
          color: "#FF9033",
          borderColor: "#FF9033",
        },
      },
    },
    MuiIconButton: {
      colorPrimary: {
        color: "#FF7500 !important",
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: "#F4F5FA",
      },
    },
  },
});
