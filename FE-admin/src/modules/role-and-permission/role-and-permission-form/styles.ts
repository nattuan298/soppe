import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiTableCell-head": {
        borderBottom: "2px solid #FF7500",
        color: "#311339",
        fontSize: 18,
      },
      "& .MuiTableCell-body": {
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
      },
    },
  }),
);
