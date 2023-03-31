import { CircularProgress } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Pagination } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import NumberFormatCustome from "src/components/text/number-format";
import { CycleFobType } from "types/api-response-type";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
interface ListItemTableMobileProp {
  item: CycleFobType;
  index: number;
}

function ListItemTableMobile({ item, index }: ListItemTableMobileProp) {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const handleToggleButton = () => {
    setisOpen((preState) => !preState);
  };
  const { t } = useTranslation("common");

  return (
    <div
      style={{
        height: isOpen ? "auto" : 70,
        border: isOpen ? "1px solid #FF7500" : "none",
      }}
    >
      <div
        className={`grid grid-cols-7 md:grid-cols-11 gap-4 items-center rounded pl-3 ${
          index % 2 === 0 ? "" : "bg-lighterGray"
        }`}
        key={index}
        style={{ height: 70 }}
      >
        <div className="col-span-2 text-sm ml-2 md:text-center text-orange">{item.round}</div>
        <div className="col-span-2 text-sm text-center hidden sm:block">
          {dayjs(item.fromDate).format("DD-MM-YYYY")}
        </div>
        <div className="col-span-2 text-sm text-center block sm:hidden">
          {dayjs(item.fromDate).format("YYYY-MM-DD")}
        </div>
        <div className="col-span-2 text-sm text-center hidden sm:block">
          {dayjs(item.toDate).format("DD-MM-YYYY")}
        </div>
        <div className="col-span-2 text-sm text-center block sm:hidden">
          {dayjs(item.toDate).format("YYYY-MM-DD")}
        </div>
        <div
          className="flex flex-row-reverse items-center col-span-1 justify-center w-full"
          style={{ width: "6%" }}
        >
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
        <>
          <div
            className={`grid grid-cols-3  w-full pt-2 rounded pl-3 pr-3 ${
              index % 2 === 0 ? "bg-white" : "bg-lighterGray"
            }`}
            style={{ height: 75 }}
          >
            <div className="text-sm ml-2">
              <div className="text-black text-[10px]">
                <p className="text-[10px] font-medium">{t("fob")}</p>
                <NumberFormatCustome value={Number.parseFloat(item.FOB).toFixed(2)} />
              </div>
            </div>
            <div className="text-sm ml-2">
              <div className="text-black text-[10px]">
                <p className="text-[10px] font-medium">{t("cycle")}</p>
                <NumberFormatCustome value={Number.parseFloat(item.cycle).toFixed(2)} />
              </div>
            </div>
            <div className="text-sm">
              <div className="text-black text-[10px]">
                <p className="text-[10px] font-medium">{t("revenue")}</p>
                <NumberFormatCustome value={Number.parseFloat(item.revenue).toFixed(2)} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const EcommissionStatement = ({
  list,
  loading,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
}: {
  list?: CycleFobType[];
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
          <p className="text-sm font-medium">{t("cycle_and_fob_report")}</p>
          <div className="mt-5">
            <div className="grid grid-cols-7 md:grid-cols-11 gap-4 bg-lighterGray h-8 items-center rounded pl-3">
              <div className="md:col-span-1 col-span-2 text-sm font-medium md:text-center">
                {t("round")}
              </div>
              <div className="col-span-2 text-sm font-medium text-center">{t("from_date")}</div>
              <div className="col-span-2 text-sm font-medium text-center">{t("to_date")}</div>
              {width === "Desktop" && (
                <React.Fragment>
                  <div className="col-span-2 text-sm font-medium text-center">{t("fob")}</div>
                  <div className="col-span-2 text-sm font-medium text-center">{t("cycle")}</div>
                  <div className="col-span-2 text-sm font-medium text-center">{t("revenue")}</div>
                </React.Fragment>
              )}
            </div>

            <div className="relative">
              {list?.map((item, index) => {
                if (width === "Desktop") {
                  return (
                    <div
                      className={`grid grid-cols-11 gap-4 items-center rounded pl-3 ${
                        index % 2 === 0 ? "" : "bg-lighterGray"
                      }`}
                      key={index}
                      style={{ height: 70 }}
                    >
                      <div className="col-span-1 text-sm text-center text-orange">{item.round}</div>
                      <div className="col-span-2 text-sm text-center">
                        {dayjs(item.fromDate).format("DD-MM-YYYY")}
                      </div>
                      <div className="col-span-2 text-sm text-center">
                        {dayjs(item.toDate).format("DD-MM-YYYY")}
                      </div>
                      <div className="col-span-2 text-sm text-center">
                        <NumberFormatCustome value={Number.parseFloat(item.FOB).toFixed(2)} />
                      </div>
                      <div className="col-span-2 text-sm text-center">
                        <NumberFormatCustome value={Number.parseFloat(item.cycle).toFixed(2)} />
                      </div>
                      <div className="col-span-2 text-sm text-center">
                        <NumberFormatCustome value={Number.parseFloat(item.revenue).toFixed(2)} />
                      </div>
                    </div>
                  );
                }
                if (width === "Mobile") {
                  return <ListItemTableMobile item={item} index={index} />;
                }
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
