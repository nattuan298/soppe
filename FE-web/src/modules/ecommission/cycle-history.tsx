import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import React, { Dispatch, SetStateAction } from "react";
import { Pagination } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { CycleHistoryType } from "types/api-response-type";
import EachCycleHistory from "./each-cycle-history";

const EcommissionStatement = ({
  list,
  loading,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
}: {
  list?: CycleHistoryType[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}) => {
  const { t } = useTranslation("common");
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
      <div className="md:flex mt-4 md:mt-6">
        <div className="col-span-2">
          <LeftNavinationReport />
        </div>
        <div className="md:pl-20 md:flex-grow">
          <p className="text-sm font-medium">{t("cycle_history_report")}</p>
          <div className="mt-5">
            <div className="flex bg-lighterGray h-8 items-center rounded pl-3 w-full pr-3">
              <div className="text-sm font-medium w-[40%] md:w-[13%]">{t("date")}</div>
              <div className="string text-sm font-medium w-[30%] md:w-[8%]">{t("cycle")}</div>
              <div className="string text-sm font-medium w-[30%] md:w-[14%]">{t("total")}</div>
              {width === "Desktop" && (
                <React.Fragment>
                  <div className="string text-sm font-medium md:w-[15%]">{t("old_left")}</div>
                  <div className="string text-sm font-medium md:w-[15%]">{t("old_right")}</div>
                  <div className="string text-sm font-medium md:w-[15%]">{t("new_left")}</div>
                  <div className="string text-sm font-medium md:w-[15%]">{t("new_right")}</div>
                </React.Fragment>
              )}
            </div>

            <div className="relative">
              {list?.map((item, index) => {
                return <EachCycleHistory item={item} index={index} screen={width} />;
              })}

              {list?.length === 0 && (
                <div className="mt-12 mb-5 flex flex-col justify-center items-center">
                  <div>
                    <NoDataIcon />
                  </div>
                  <span className="mt-4">{t`no_data`}</span>
                  {loading && (
                    <div className="flex items-center justify-center w-full h-full">
                      <CircularProgress />
                    </div>
                  )}
                </div>
              )}

              {(!list || list.length > 0) && loading && (
                <>
                  <div className="absolute top-8 left-0 flex items-center justify-center w-full">
                    <CircularProgress />
                  </div>
                  {!list && <div className="h-16" />}
                </>
              )}

              <div className="w-full mt-5">
                <Pagination
                  totalPage={total}
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
      </div>
    </div>
  );
};

export default EcommissionStatement;
