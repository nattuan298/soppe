import TableCell, { TableCellProps } from "@material-ui/core/TableCell";

export function Th({ children, align, ...props }: TableCellProps) {
  return (
    <TableCell align={align} {...props}>
      {children}
    </TableCell>
  );
}
