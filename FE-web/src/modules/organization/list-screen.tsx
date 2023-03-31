import { Fragment, useEffect, useMemo, useState } from "react";
import { Table } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/state/store";
import { Pagination } from "src/components";
import TableHeader from "./components/table-header";
import TableBody from "./components/table-body";
import { fetchOrganizationChart } from "src/feature/organization/organization.action";
import paramsSerializer from "src/lib/paramsSerializer";

interface ListScreenProps {
  team: string;
}

export default function ListScreen({ team }: ListScreenProps) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [params, setParams] = useState<string>("");
  const { keyword, organizationList } = useSelector((state: RootState) => state.organization);

  const totalPage = useMemo(() => {
    if (team === "Left") {
      return Math.ceil(organizationList.total / pageSize);
    }
    return Math.ceil(organizationList.total / pageSize);
  }, [organizationList, team, pageSize]);

  useEffect(() => {
    setPage(1);
    const params = paramsSerializer({ page: 1, pageSize, keyword, team });
    const paramsURL = params !== "" ? `?${params}` : "";
    setParams(paramsURL);
  }, [pageSize, keyword, team]);

  useEffect(() => {
    const params = paramsSerializer({ page, pageSize, keyword, team });
    const paramsURL = params !== "" ? `?${params}` : "";
    setParams(paramsURL);
  }, [page, pageSize, keyword, team]);

  useEffect(() => {
    if (params === "") {
      return;
    }
    if (window) {
      window.scrollTo(0, 0);
    }
    dispatch(fetchOrganizationChart(params));
  }, [dispatch, params]);

  return (
    <Fragment>
      <Table aria-label="customized table">
        <TableHeader />
        <TableBody />
      </Table>
      <div className="w-full h-full mt-5">
        <Pagination
          pageSize={pageSize}
          totalPage={totalPage}
          selectedPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </Fragment>
  );
}
