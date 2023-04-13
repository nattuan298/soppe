import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    autocomplete: {
      "& .MuiAutocomplete-endAdornment": {
        display: "none",
      },
      "& + p": {
        color: "#FF0000",
      },
    },
    textField: {
      "& .MuiInputBase-input": {
        border: "1px solid #EBEBEB",
        borderRadius: 5,
        background: "#F4F5FA",
        padding: "15px !important",
        fontFamily: "Kanit",
        fontSize: "14px",
        width: 716,
        "&:focus": {
          border: "1px solid #FF7500",
        },
        "&::placeholder": {
          color: "#231F20",
        },
      },
      "& .MuiInput-underline:before": {
        border: "none",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        border: "none",
      },
      "& .MuiInput-underline:after": {
        border: "none",
      },
      "& .MuiInputAdornment-positionEnd": {
        position: "absolute",
        right: 20,
      },
    },
    error: {
      "& .MuiInputBase-input": {
        border: "1px solid #FF0000",
      },
    },
    root: {
      position: "absolute",
      top: 6,
      right: 45,
    },
  }),
);
