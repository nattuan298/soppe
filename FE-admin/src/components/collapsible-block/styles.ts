import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    collapseButton: {
      flexGrow: 0,
      backgroundColor: "#F4F5FA",
      width: "24px",
      height: "24px",
    },
  }),
);
