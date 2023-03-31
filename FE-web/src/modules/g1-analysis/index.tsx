import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import { RootState } from "src/state/store";
import { Pagination } from "src/components";
import paramsSerializer from "src/lib/paramsSerializer";
import { G1AnalysisTable } from "./g1-analysis-table";
import { getG1AnalysisDispatch } from "src/feature/g1-analysis-analysis/g1-analysis-analysis.action";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
// import { getG1Analysis } from "src/feature/g1-analysis-analysis/g1-analysis-analysis.slice";

export default function G1Analysis({ keyword }: { keyword: string }) {
  const { t } = useTranslation("common");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [params, setParams] = useState<string>("");
  const { g1Analysis } = useSelector((state: RootState) => state.g1Analysis);

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
    const params = paramsSerializer({ page: 1, keyword, pageSize });
    setParams(`?${params}`);
  }, [keyword, pageSize]);

  useEffect(() => {
    const params = paramsSerializer({ page, keyword, pageSize });
    setParams(`?${params}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (params === "") {
      return;
    }
    if (window) {
      window.scrollTo(0, 0);
    }
    // dispatch(getG1Analysis(params))
    dispatch(getG1AnalysisDispatch({ paramsURL: params }));
  }, [dispatch, params]);
  const width = useGetScreenWidth();

  return (
    <div className="flex flex-col">
      <div className="mb-5 text-black-dark text-sm font-medium">{t`g1_analysis`}</div>
      <G1AnalysisTable />
      <div className="w-full mt-5">
        <Pagination
          totalPage={g1Analysis.totalPage}
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
