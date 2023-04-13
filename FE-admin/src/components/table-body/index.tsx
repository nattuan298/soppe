import MuiTableBody, { TableBodyProps } from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useTranslation } from "react-i18next";

import { Spinner } from "../spinner";
import { NoDataIcon } from "../icons";

interface CustomTableBodyProps extends TableBodyProps {
  loading?: boolean;
  colSpan?: number;
  dataLength?: number;
}

export function TableBody({
  loading,
  colSpan,
  children,
  dataLength,
  ...props
}: CustomTableBodyProps) {
  const { t } = useTranslation("common");

  function renderTableBody() {
    if (loading) {
      return (
        <TableRow>
          <TableCell style={{ border: "none" }} colSpan={colSpan}>
            <Spinner />
          </TableCell>
        </TableRow>
      );
    }
    if (!loading && dataLength === 0) {
      return (
        <TableRow>
          <TableCell align="center" style={{ border: "none" }} colSpan={colSpan}>
            <div className="w-full flex justify-center flex-col items-center">
              <NoDataIcon />
              <p className="text-base font-light mt-5">{t("no-data")}</p>
            </div>
          </TableCell>
        </TableRow>
      );
    }
    return children;
  }

  return <MuiTableBody {...props}>{renderTableBody()}</MuiTableBody>;
}
