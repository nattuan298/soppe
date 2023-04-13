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
        padding: "13px 35px 13px 15px !important",
        fontFamily: "Kanit",
        width: "100%",
        fontSize: "14px",
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
      "& .MuiInputBase-fullWidth": {
        paddingRight: 0,
      },
    },
    error: {
      "& .MuiInputBase-input": {
        border: "1px solid #FF0000",
      },
    },
    root: {
      position: "absolute",
      top: 2,
      right: 14,
    },
  }),
);
