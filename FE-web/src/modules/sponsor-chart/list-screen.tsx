import { Fragment, useEffect, useState } from "react";
import { Table } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/state/store";
import { Pagination } from "src/components";
import TableHeader from "./components/table-header";
import TableBody from "./components/table-body";
import { fetchSponsorChart } from "src/feature/sponsor-chart/sponsor-chart.action";
import paramsSerializer from "src/lib/paramsSerializer";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

interface ListScreenProps {
  side: string;
  keyword: string;
}

export default function ListScreen({ side, keyword }: ListScreenProps) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [params, setParams] = useState<string>("");
  const { sponsorChart } = useSelector((state: RootState) => state.sponsorChart);

  useEffect(() => {
    setPage(1);
    const params = paramsSerializer({ page: 1, pageSize, keyword, side });
    const paramsURL = params !== "" ? `?${params}` : "";
    setParams(paramsURL);
  }, [pageSize, keyword, side]);

  useEffect(() => {
    const params = paramsSerializer({ page, pageSize, keyword, side });
    const paramsURL = params !== "" ? `?${params}` : "";
    setParams(paramsURL);
  }, [page, pageSize, keyword, side]);

  useEffect(() => {
    if (params === "") {
      return;
    }
    if (window) {
      window.scrollTo(0, 0);
    }
    dispatch(fetchSponsorChart(params));
  }, [dispatch, params]);

  const width = useGetScreenWidth();

  return (
    <Fragment>
      <Table aria-label="customized table">
        <TableHeader />
        <TableBody />
      </Table>
      <div className="w-full h-full mt-5">
        <Pagination
          pageSize={pageSize}
          totalPage={sponsorChart.totalPage}
          selectedPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          screen={width}
        />
      </div>
    </Fragment>
  );
}
