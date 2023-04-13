import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiTableCell-head": {
        color: "#311339",
        fontSize: 18,
      },
    },
  }),
);
