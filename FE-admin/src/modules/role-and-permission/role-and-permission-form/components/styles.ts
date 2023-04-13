import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiTableCell-head": {
        borderBottom: "2px solid #FF7500",
        color: "#311339",
        fontSize: 18,
      },
    },
    row: {
      "& .MuiTableCell-body": {
        color: "#311339",
        fontSize: 16,
      },
      "& > *": {
        borderBottom: "unset",
      },
    },
    subFeature: {
      heigh: "0px",
      "& .MuiTableCell-body": {
        color: "#707070",
        fontSize: 16,
        fontWeight: 300,
        border: "none",
      },
      "&:nth-last-child(2)": {
        "& .MuiTableCell-body": {
          borderBottom: "none",
        },
      },
      "& > *": {
        border: "unset",
      },
    },
  }),
);
