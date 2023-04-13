import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      "& .MuiInputBase-input": {
        border: "1px solid #EBEBEB",
        borderRadius: 5,
        background: "#ffffff",
        padding: "15px",
        fontFamily: "Kanit",
        fontSize: "14px",
        "&:focus": {
          border: "1px solid #FF7500",
        },
        "&::placeholder": {
          color: "#bcbcbc",
          fontSize: "14px",
          opacity: "1",
        },
      },
      "& .MuiInputBase-multiline": {
        padding: "100px",
      },
      "& .MuiInputBase-input.Mui-disabled": {
        background: "rgba(244, 245, 250, var(--tw-bg-opacity))",
        color: "#231F20",
      },
    },
    inputChangePassword: {
      "& .MuiInputBase-input": {
        border: "1px solid #EBEBEB",
        borderRadius: 5,
        background: "#ffffff",
        padding: "15px",
        fontFamily: "Kanit",
        fontSize: "14px",
        "&:focus": {
          border: "1px solid #FF7500",
        },
        "&::placeholder": {
          color: "#bcbcbc",
          fontSize: "14px",
          opacity: "1",
        },
      },
      "& .MuiInputBase-multiline": {
        padding: "100px",
      },
      "& .MuiInputBase-input.Mui-disabled": {
        background: "rgba(244, 245, 250, var(--tw-bg-opacity))",
        color: "#231F20",
      },
    },
    multilinecss: {},
    error: {
      "& .MuiInputBase-input": {
        border: "1px solid #FF0000",
      },
      "& + p": {
        color: "#FF0000",
        marginTop: 5,
      },
    },
    password: {
      "& .MuiInputAdornment-positionEnd": {
        position: "absolute",
        right: 20,
      },
    },
  }),
);
