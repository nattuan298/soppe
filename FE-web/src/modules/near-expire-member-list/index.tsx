import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import { ExpiredMemberListType } from "src/feature/expired-member-list/types";
import { getNearExpireDispatch } from "src/feature/near-expire-member-list/near-expire-member-list.action";
// import { getNearExpireMemberList } from "src/feature/near-expire-member-list/near-expire-member-list.slice";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import paramsSerializer from "src/lib/paramsSerializer";
import { RootState } from "src/state/store";
import { TableNearExpireMemberList } from "./table-near-expire-member-list";

interface ExpiredMemberListProps {
  keyword?: string;
}

export const NearExpireMemberList = ({ keyword }: ExpiredMemberListProps) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { nearExpiredMemberList, loading } = useSelector(
    (state: RootState) => state.nearExpireMemberLists,
  );
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [params, setParams] = useState<string>("");

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
    if (window) {
      window.scrollTo(0, 0);
    }
    if (params === "") {
      return;
    }
    // dispatch(getNearExpireMemberList(params));
    dispatch(getNearExpireDispatch({ paramsURL: params }));
  }, [dispatch, params]);
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
      <div className="md:flex mt-4 md:mt-6">
        <div className="col-span-2">
          <LeftNavinationReport />
        </div>
        <div className="w-full md:pl-20">
          <p className="text-sm font-medium">{t`near_expire_member_list`}</p>

          <div className="mt-5">
            <div className="flex bg-lighterGray h-8 items-center rounded pl-3 w-full pr-3">
              <div className="text-sm font-medium md:w-[35%] w-[40%]">{t("user")}</div>
              <div
                className="string text-sm font-medium w-[30%] md:w-[25%] ml-[4px]"
                // style={{ width: "25%", marginLeft: "4px" }}
              >
                {t("expired_date")}
              </div>
              <div className="string text-sm font-medium pl-4 md:pl-0" style={{ width: "15%" }}>
                {t("gen")}
              </div>
              {width === "Desktop" && (
                <div className="string text-sm font-medium" style={{ width: "25%" }}>
                  {t("sponsor")}
                </div>
              )}
            </div>

            <div className="">
              {nearExpiredMemberList.data &&
                !loading &&
                nearExpiredMemberList.data.map((list: ExpiredMemberListType, index: number) => (
                  <TableNearExpireMemberList list={list} index={index + 1} screen={width} />
                ))}

              {nearExpiredMemberList.data?.length === 0 && (
                <div className="md:mt-12 mb-5 flex flex-col justify-center items-center">
                  {!loading && (
                    <>
                      <div>
                        <NoDataIcon />
                      </div>
                      <span className="mt-4">{t`no_data`}</span>
                    </>
                  )}
                  {loading && (
                    <div className="flex items-center justify-center w-full mt-4">
                      <CircularProgress />
                    </div>
                  )}
                </div>
              )}

              {(!nearExpiredMemberList.data || nearExpiredMemberList.data.length > 0) && loading && (
                <div className=" top-8 left-0 flex items-center justify-center w-full mt-4">
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>

          <div className="w-full mt-5">
            <Pagination
              totalPage={Math.ceil(nearExpiredMemberList.total / pageSize)}
              selectedPage={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              screen={width}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
