import { TableCell, createStyles, withStyles } from "@material-ui/core";

export const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      backgroundColor: "#F4F5FA",
      color: "#231F20",
      height: "32px",
      fontSize: 14,
    },
  }),
)(TableCell);
