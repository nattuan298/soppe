import * as React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useTranslation } from "react-i18next";
import { SortEndHandler, SortableContainer } from "react-sortable-hoc";
import { useLocation } from "react-router-dom";

import { Spinner } from "src/components";
import { Pagination } from "src/components/pagination";
import { useDebounceValue } from "src/hooks";
import { NoDataIcon } from "../icons";
import "./styles.css";

const queryString = require("query-string");

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiTableCell-head, & .MuiTableCell-body": {
        color: "#311339",
        fontSize: 18,
      },
    },
  }),
);

interface Result {
  _id?: string;
}

interface GenericTableTypeProps {
  header: React.ReactNode;
  results: Result[];
  FilterComponent?: React.ElementType;
  renderRow: Function;
  noPagination?: boolean;
  total?: number;
  setParams?: Function;
  loading?: boolean;
  onSortEnd?: SortEndHandler;
}
interface PropsSortTable {
  children: React.ReactNode | React.ReactNode[];
}

const SortTable = SortableContainer(({ children }: PropsSortTable) => (
  <TableBody>{children}</TableBody>
));

export function GenericTable({
  header,
  FilterComponent = () => null,
  renderRow: RenderRow,
  results = [],
  total = 0,
  noPagination,
  loading,
  setParams = () => {},
  onSortEnd,
}: GenericTableTypeProps) {
  const { t } = useTranslation("common");
  const [filter, setFilter] = React.useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  const params = useDebounceValue(filter, 500);

  const location = useLocation();

  const locationSearch = queryString.parse(location.search);

  React.useEffect(() => {
    if (locationSearch.page) {
      setPage(Number(locationSearch.page));
    }
  }, [locationSearch.page]);

  React.useEffect(() => {
    if (params) {
      setParams({ ...params, page, pageSize });
    }
  }, [params, page, pageSize, setParams]);

  const { root } = useStyles();

  const bodyTable = React.useMemo(() => {
    if (loading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell style={{ border: "none" }} colSpan={8}>
              <Spinner />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    if (results.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell style={{ border: "none" }} colSpan={8}>
              <div className="w-full h-72 grid justify-items-center text-center">
                <div className="mt-8">
                  <NoDataIcon />
                </div>
                <p className="txt-no-data font-light">{t`no-data`}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    if (onSortEnd) {
      return (
        <SortTable onSortEnd={onSortEnd} useDragHandle lockAxis="y">
          {results.map((item, index) => (
            <RenderRow key={item._id} index={index} {...item} />
          ))}
        </SortTable>
      );
    }
    return (
      <TableBody>
        {results.map((item, index) => (
          <RenderRow key={item._id || index} {...item} />
        ))}
      </TableBody>
    );
  }, [loading, results, t, RenderRow, onSortEnd]);
  return (
    <React.Fragment>
      <FilterComponent setFilter={setFilter} setPage={setPage} />
      <div className="generic-table bg-white w-97/100 m-auto mt-5">
        <Table className={root}>
          {header && <TableHead>{header}</TableHead>}
          {bodyTable}
        </Table>
        {!noPagination && (
          <div className="w-full mt-5">
            <Pagination
              totalPage={total}
              onPageChange={(number: number) => {}}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
