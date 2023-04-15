import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    tableHead: {
      "& .MuiTableCell-head": {
        padding: "0 0 34px 0",
        color: "#311339",
        fontSize: 18,
      },
    },
    tableBody: {
      "& .MuiTableCell-body": {
        borderBottom: "none",
        padding: "0 0 20px 0",
        color: "#311339",
        fontSize: 18,
      },
    },
  }),
);
