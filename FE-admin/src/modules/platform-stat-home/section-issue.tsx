import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { RootState } from "src/store";
import { Search, Spinner } from "src/components";
import { Pagination } from "src/components/pagination";
import { NoDataIcon } from "src/components/icons";
import { fetchReportIssue } from "src/store/platform-dashboard.action";

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

const LoadingScreen = () => (
  <TableRow>
    <TableCell style={{ border: "none" }} colSpan={8}>
      <Spinner />
    </TableCell>
  </TableRow>
);

const NoDataScreen = () => {
  const { t } = useTranslation("common");
  return (
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
  );
};

export default function SectionIssueReport() {
  const { t } = useTranslation("common");
  const { root } = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>("");

  const { issuesReport, loadingIssues } = useSelector(
    (state: RootState) => state.platformDashboard,
  );
  const { data = [], limit, total } = issuesReport;

  const bodyTable = useMemo(() => {
    if (loadingIssues) {
      return <LoadingScreen />;
    }
    if (data.length === 0) {
      return <NoDataScreen />;
    }
    return data.map((item) => {
      const { topic, publishDate, detail, _id } = item;
      return (
        <TableRow key={_id}>
          <TableCell>
            <div className="max-w-6xl">
              <div className="text-lg text-black-primary font-medium">{topic}</div>
              <div className="text-base text-gray-dark">{detail}</div>
            </div>
          </TableCell>
          <TableCell className="w-72">
            <div className="flex text-purple-primary text-lg">
              {dayjs(publishDate).format("DD MMM YYYY hh:mm:ss")}
            </div>
          </TableCell>
        </TableRow>
      );
    });
  }, [loadingIssues, data, t]);

  const getData = useCallback(() => {
    dispatch(fetchReportIssue({ page, pageSize, keyword }));
  }, [fetchReportIssue, page, pageSize, keyword]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleOnChangeSearch = (inputSearch: string) => {
    const newKeyword = inputSearch.trim();
    if (keyword !== newKeyword) {
      setKeyword(keyword);
      setPage(1);
    }
  };

  return (
    <div className="w-97/100 m-auto">
      <div className="w-full rounded-navbar bg-white shadow-navbar">
        <div className="h-24 w-full flex justify-between items-center px-8">
          <div className="flex float-left text-xl">{t`issue-report`}</div>
          <div className="flex w-62/100 justify-end seach-component">
            <Search
              className="search-issue right-0 mr-1.5"
              placeholder={t`search`}
              onSearch={handleOnChangeSearch}
              value={keyword}
            />
          </div>
        </div>
        <div className="generic-table">
          <Table className={root}>
            <TableBody>{bodyTable}</TableBody>
          </Table>
          <div className="w-full mt-5">
            <Pagination
              selectedPage={page}
              totalPage={Math.ceil(total / limit)}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
