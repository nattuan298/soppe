import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiPaper-root": {
        width: 375,
        padding: "30px 28px",
        borderRadius: 20,
        boxShadow: "0px 0px 10px #0000001A",
        fontFamily: "Kanit",
        display: "flex",
        alignItems: "center",
      },
    },
  }),
);
