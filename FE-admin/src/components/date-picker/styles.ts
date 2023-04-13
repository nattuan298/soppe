import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    datePicker: {
      "& .MuiInputBase-input": {
        cursor: "pointer",
        backgroundColor: "#ffffff !important",
      },
      "& .Mui-disabled": {
        color: "#231f20",
      },
      "& .MuiInputAdornment-positionEnd": {
        position: "absolute",
        right: 20,
      },
      "& .MuiInputBase-input.Mui-disabled": {
        backgroundColor: "#F4F5FA !important",
      },
    },
  }),
);
