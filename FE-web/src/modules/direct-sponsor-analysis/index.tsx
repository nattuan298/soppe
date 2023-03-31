import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import { RootState } from "src/state/store";
import { Pagination } from "src/components";
import DirectSponsorTable from "./direct-sponsor-table";
import paramsSerializer from "src/lib/paramsSerializer";
import { getDirectSponsorAnalysisDispatch } from "src/feature/direct-sponsor-analysis/direct-sponsor-analysis.action";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
// import { getDirectSponsorAnalysis } from "src/feature/direct-sponsor-analysis/direct-sponsor-analysis.slice";

export default function DirectSponsorAnalysis({ searchId }: { searchId: string }) {
  const { t } = useTranslation("common");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [params, setParams] = useState<string>("");
  const { sponsorAnalysis } = useSelector((state: RootState) => state.sponsorAnalysis);

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
    const params = paramsSerializer({ page: 1, searchId, pageSize });
    setParams(`?${params}`);
  }, [searchId, pageSize]);

  useEffect(() => {
    const params = paramsSerializer({ page, searchId, pageSize });
    setParams(`?${params}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getData = useCallback(() => {
    if (params === "") {
      return;
    }
    if (window) {
      window.scrollTo(0, 0);
    }
    // dispatch(getDirectSponsorAnalysis(params));
    dispatch(getDirectSponsorAnalysisDispatch({ paramsURL: params }));
  }, [params, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);
  const width = useGetScreenWidth();

  return (
    <div className="flex flex-col">
      <div className="mb-5 text-black-dark text-sm font-medium">{t`direct-sponsor-team-analysis`}</div>
      <DirectSponsorTable />
      <div className="w-full mt-5">
        <Pagination
          totalPage={sponsorAnalysis.totalPage}
          selectedPage={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          screen={width}
        />
      </div>
    </div>
  );
}
