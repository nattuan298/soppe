import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 55,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 3,
      "&$checked": {
        transform: "translateX(27px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#8DC900",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 20,
      height: 20,
    },
    track: {
      borderRadius: 13,
      border: "none",
      backgroundColor: "#EBEBEB",
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }),
);
