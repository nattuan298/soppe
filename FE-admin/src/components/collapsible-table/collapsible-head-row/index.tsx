import { ReactNode } from "react";
import TableRow, { TableRowProps } from "@material-ui/core/TableRow";

import { useStyles } from "./styles";

interface CollapsibleRowProps extends TableRowProps {
  children?: ReactNode;
}

export function CollapsibleHeadRow({ children, ...props }: CollapsibleRowProps) {
  const { root } = useStyles();

  return (
    <TableRow className={root} {...props}>
      {children}
    </TableRow>
  );
}
