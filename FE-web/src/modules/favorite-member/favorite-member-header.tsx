import { withStyles } from "@material-ui/styles";
import { TableCell, TableHead, TableRow, makeStyles } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";

const StyledTableHead = withStyles({
  root: {
    background: "#F4F5FA",
    height: 32,
    "& .MuiTableCell-head": {
      borderBottom: "none",
    },
  },
})(TableHead);

const useStyles = makeStyles({
  headCell: {
    padding: "0px 10px",
    minWidth: 75,
  },
  headLeft: {
    padding: "0px 10px",
    borderRadius: "5px 0px 0px 5px",
  },
  headRight: {
    padding: "0px 10px",
    borderRadius: "0px 5px 5px 0px",
  },
});
interface TableHeaderProps {
  screen: string;
}
export default function TableHeader({ screen }: TableHeaderProps) {
  const { t } = useTranslation("common");
  const classes = useStyles();
  return (
    <StyledTableHead>
      <TableRow>
        <TableCell align="left" className={classes.headLeft}>{t`user`}</TableCell>
        <TableCell align="center" className={classes.headCell}>{t`team`}</TableCell>
        <TableCell align="center" className={classes.headCell}>{t`level`}</TableCell>
        {screen === "Desktop" && (
          <>
            <TableCell align="left" className={classes.headCell}>{t`sponsor`}</TableCell>
            <TableCell align="center" className={classes.headCell}>{t`type`}</TableCell>
            <TableCell align="center" className={classes.headCell}>{t`star`}</TableCell>
            <TableCell align="center" className={classes.headCell}>{t`c-matching`}</TableCell>
            <TableCell align="center" className={classes.headRight}>{t`h-position`}</TableCell>
          </>
        )}
        <TableCell align="center" className={classes.headRight}>
          {}
        </TableCell>
      </TableRow>
    </StyledTableHead>
  );
}
