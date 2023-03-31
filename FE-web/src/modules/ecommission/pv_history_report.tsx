import { CircularProgress } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, SetStateAction, useState } from "react";
import { Pagination } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { PVHistoryType } from "types/api-response-type";
import FieldCheckNull from "./field_check_null";

const PvHistoryReport = ({
  list,
  loading,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
}: {
  list?: PVHistoryType[];
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
          <p className="text-sm font-medium">{t("pv_history_report")}</p>
          <div className="mt-5">
            <div className="flex bg-lighterGray h-8 items-center rounded pl-3 w-full pr-3">
              <div className="text-sm font-medium md:w-[14%] w-[30%]">{t("date")}</div>
              <div className="string text-sm font-medium md:w-[12%] w-[32%]">
                {t("total_left_pv")}
              </div>
              <div className="string text-sm font-medium md:w-[12%] w-[32%]">
                {t("total_right_pv")}
              </div>
              {width === "Desktop" && (
                <>
                  <div className="string text-sm font-medium" style={{ width: "12%" }}>
                    {t("co_left_pv")}
                  </div>
                  <div className="string text-sm font-medium" style={{ width: "12%" }}>
                    {t("co_right_pv")}
                  </div>
                  <div className="string text-sm font-medium" style={{ width: "12%" }}>
                    {t("new_left_pv")}
                  </div>
                  <div className="string text-sm font-medium" style={{ width: "12%" }}>
                    {t("new_right_pv")}
                  </div>
                  <div className="string text-sm font-medium" style={{ width: "12%" }}>
                    {t("cycle")}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              {list?.map((item, index) => {
                return <EachPVHistory item={item} index={index} />;
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

const EachPVHistory = ({ item, index }: { item: PVHistoryType; index: number }) => {
  const { t } = useTranslation("common");
  const [isOpen, setisOpen] = useState(false);

  const handleToggleButton = () => {
    setisOpen((preState) => !preState);
  };
  const width = useGetScreenWidth();

  return (
    <div
      className={`w-full ${index % 2 === 0 ? "" : "bg-lighterGray"}`}
      style={{ height: isOpen ? "auto" : 70, border: isOpen ? "1px solid #FF7500" : "none" }}
    >
      <div className="flex w-full items-center rounded pl-3 pr-3" style={{ height: 70 }}>
        <div className="text-sm font-medium md:w-[14%] w-[30%]">
          {`${item.yth}-${item.mth.length < 2 ? "0" : ""}${item.mth}`}
        </div>
        <div className="text-sm font-medium md:w-[12%] w-[32%]">
          <FieldCheckNull value={item.totalPvLeft} />
        </div>
        <div className="text-sm font-medium md:w-[12%] w-[32%]">
          <FieldCheckNull value={item.totalPvRight} />
        </div>
        {width === "Desktop" && (
          <>
            <div className="text-sm font-medium md:w-[12%]">
              <FieldCheckNull value={item.carryLeft} />
            </div>
            <div className="text-sm font-medium md:w-[12%]">
              <FieldCheckNull value={item.carryRight} />
            </div>
            <div className="text-sm font-medium md:w-[12%]">
              <FieldCheckNull value={item.pvLeft} />
            </div>
            <div className="text-sm font-medium md:w-[12%]">
              <FieldCheckNull value={item.pvRight} />
            </div>
            <div className="text-sm font-medium md:w-[9%]">
              <FieldCheckNull value={item.cycle} notAddtoFixed />
            </div>
          </>
        )}
        <div className="flex flex-row-reverse md:w-[5%]">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
              index % 2 !== 0 ? "bg-white" : "bg-lighterGray"
            }`}
            onClick={handleToggleButton}
          >
            {!isOpen && <KeyboardArrowDownIcon fontSize="small" />}
            {isOpen && <KeyboardArrowUpIcon fontSize="small" className="text-orange" />}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={"grid grid-cols-4 gap-y-5 md:grid-cols-7 w-full mt-2 rounded pl-3 pr-3 mb-6"}
        >
          <div className="md:text-sm text-[10px] block md:hidden">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`co_left_pv`}</p>
            <FieldCheckNull value={item.carryLeft} />
          </div>
          <div className="md:text-sm text-[10px] block md:hidden">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`co_right_pv`}</p>
            <FieldCheckNull value={item.carryRight} />
          </div>
          <div className="md:text-sm text-[10px] block md:hidden">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`new_left_pv`}</p>
            <FieldCheckNull value={item.pvLeft} />
          </div>
          <div className="md:text-sm text-[10px] block md:hidden">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`new_right_pv`}</p>
            <FieldCheckNull value={item.pvRight} />
          </div>
          <div className="md:text-sm text-[10px] block md:hidden">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`cycle`}</p>
            <FieldCheckNull value={item.cycle} notAddtoFixed />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2  md:text-sm text-[10px] hidden sm:block">{t`private_pv`}</p>
            <p className="font-medium mb-2  md:text-sm text-[10px] block sm:hidden">Priv. PV</p>
            <FieldCheckNull value={item.privatePv} />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2 md:text-sm text-[10px]">{t`matching`}</p>
            <FieldCheckNull value={item.matchingPos} notFormat />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`new-sponsor`}</p>
            <FieldCheckNull value={item.newSponsor} notAddtoFixed />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2 md:text-sm text-[10px]">{t`mem_to_sup`}</p>
            <FieldCheckNull value={item.newSu} notAddtoFixed />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`mem_to_ex`}</p>
            <FieldCheckNull value={item.newEx} notAddtoFixed />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2 md:text-sm text-[10px]">TP</p>
            <FieldCheckNull value={item.travelPoint} />
          </div>
          <div className="md:text-sm text-[10px]">
            <p className="font-medium mb-2  md:text-sm text-[10px]">{t`travel_point`}</p>
            <FieldCheckNull value={item.travelPoint} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PvHistoryReport;
