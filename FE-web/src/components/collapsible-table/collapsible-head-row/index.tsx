import TableRow, { TableRowProps } from "@material-ui/core/TableRow";
import { ReactNode } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface CollapsibleRowProps extends TableRowProps {
  children?: ReactNode;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiTableCell-head": {
        borderBottom: "none",
        color: "#311339",
        fontSize: 14,
      },
    },
  }),
);

export function CollapsibleHeadRow({ children, ...props }: CollapsibleRowProps) {
  const { root } = useStyles();

  return (
    <TableRow className={root} {...props}>
      {children}
    </TableRow>
  );
}
