import { withStyles } from "@material-ui/styles";
import { TableCell, TableHead, TableRow, makeStyles } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
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

export function G1AnalysisTableHeader() {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const width = useGetScreenWidth();
  return (
    <React.Fragment>
      <StyledTableHead>
        <TableRow>
          <TableCell align="left" className={classes.headLeft}>{t`user`}</TableCell>
          <TableCell align="center" className={classes.headCell}>{t`team`}</TableCell>
          <TableCell align="center" className={classes.headCell}>{t`status`}</TableCell>
          {width === "Desktop" && (
            <React.Fragment>
              <TableCell align="center" className={classes.headCell}>{t`own_pv`}</TableCell>
              <TableCell align="center" className={classes.headCell}>{t`left_pv`}</TableCell>
              <TableCell align="center" className={classes.headCell}>{t`right_pv`}</TableCell>
              <TableCell align="center" className={classes.headCell}>{t`pv_level`}</TableCell>
              <TableCell align="center" className={classes.headRight}>{t`document`}</TableCell>
            </React.Fragment>
          )}
          <TableCell />
        </TableRow>
      </StyledTableHead>
    </React.Fragment>
  );
}
