import { CircularProgress } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, SetStateAction, useState } from "react";
import { Pagination } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import NumberFormatCustome from "src/components/text/number-format";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { stringNumberToStringWithToFix } from "src/utils";
import { OneEcomStatementType } from "types/api-response-type";

interface ListItemTableMobileProp {
  item: OneEcomStatementType;
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
        className={`${
          isOpen ? "h-[59px]" : "h-[70px]"
        } grid grid-cols-12 gap-4 items-center rounded pl-3 ${
          index % 2 === 0 ? "" : "bg-lighterGray"
        }`}
        key={index}
      >
        <div className="col-span-5 text-sm">{item.date}</div>
        <div className="col-span-3 text-sm text-center">
          <NumberFormatCustome value={stringNumberToStringWithToFix(item.in)} />
        </div>
        <div className="col-span-2 text-sm text-center">
          <NumberFormatCustome value={stringNumberToStringWithToFix(item.out)} />
        </div>
        <div
          className="flex flex-row-reverse items-center col-span-2 justify-center w-full"
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
            className={`flex w-full pr-3 pl-3 pb-3 rounded h-[60px] ${
              index % 2 === 0 ? "bg-white" : "bg-lighterGray"
            }`}
          >
            <div className="text-sm" style={{ width: "20%" }}>
              <div className="text-black" style={{ width: "200px", marginRight: "8px" }}>
                <p className="text-[10px] font-medium">{t("remark")}</p>
                <p className="text-[10px]">{item.remark}</p>
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
  list?: OneEcomStatementType[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}) => {
  const { t } = useTranslation("common");
  const width = useGetScreenWidth();
  console.log(list);
  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
      <div className="md:flex mt-4 md:mt-6">
        <div className="col-span-2">
          <LeftNavinationReport />
        </div>
        <div className="md:pl-20 md:flex-grow">
          <p className="text-sm font-medium hidden sm:block">{t("ecommission_statement")}</p>
          <p className="text-sm font-medium block sm:hidden">{t("ecommission_statement_mobile")}</p>
          <div className="mt-5">
            <div className="grid grid-cols-12 sm:grid-cols-10 gap-4 bg-lighterGray h-8 items-center rounded pl-3">
              <div className="sm:col-span-2 col-span-5 text-sm font-medium">{t("date")}</div>
              <div className="col-span-3 sm:col-span-2 text-sm font-medium text-center">
                {t("in")}
              </div>
              <div className="col-span-2 text-sm font-medium text-center">{t("out")}</div>
              {width === "Desktop" && (
                <div className="col-span-4 text-sm font-medium">{t("remark")}</div>
              )}
            </div>

            <div className="relative">
              {list?.map((item, index) => {
                if (width === "Desktop") {
                  return (
                    <div
                      className={`grid grid-cols-10 gap-4 items-center rounded pl-3 ${
                        index % 2 === 0 ? "" : "bg-lighterGray"
                      }`}
                      key={index}
                      style={{ height: 70 }}
                    >
                      <div className="col-span-2 text-sm">{item.date}</div>
                      <div className="col-span-2 text-sm sm:hidden block">
                        {dayjs(item.date).format("")}
                      </div>
                      <div className="col-span-2 text-sm text-center">
                        <NumberFormatCustome value={stringNumberToStringWithToFix(item.in)} />
                      </div>
                      <div className="col-span-2 text-sm text-center">
                        <NumberFormatCustome value={stringNumberToStringWithToFix(item.out)} />
                      </div>
                      <div className="col-span-4 text-sm">{item.remark}</div>
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
