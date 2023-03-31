import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import NumberFormatCustome from "src/components/text/number-format";
import { NewRegisterEachType } from "types/api-response-type";

const NewRegisterUpdateSuExSteam = ({
  list,
  loading,
}: {
  list?: NewRegisterEachType[];
  loading: boolean;
}) => {
  const { t } = useTranslation("common");
  const total = useMemo(() => {
    const total: {
      new_ex: number;
      new_register: number;
      new_su: number;
    } = {
      new_ex: 0,
      new_register: 0,
      new_su: 0,
    };

    list?.forEach((item) => {
      total.new_ex += parseFloat(item.new_ex);
      total.new_register += parseFloat(item.new_register);
      total.new_su += parseFloat(item.new_su);
    });
    return total;
  }, [list]);

  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
      <div className="md:flex mt-4 md:mt-6">
        <div className="col-span-2">
          <LeftNavinationReport />
        </div>
        <div className="md:pl-20 md:flex-grow">
          <p className="text-sm font-medium md:w-full">{t("new_register_update_su_ex_s_team")}</p>
          <div className="mt-5">
            <div className="flex bg-lighterGray h-8 items-center rounded pl-3 w-full pr-3">
              <div className="text-sm font-medium" style={{ width: "15%" }}>
                {t("month")}
              </div>
              <div className="text-sm font-medium text-center" style={{ width: "85%" }}>
                {t("pin")}
              </div>
            </div>
            {!loading && (
              <div className="flex bg-orangeLight h-8 items-center rounded pl-3 w-full pr-3 mt-2">
                <div className="text-sm" style={{ width: "15%" }} />
                <div
                  className="text-sm grid grid-cols-3 md:gap-20 text-orange items-center"
                  style={{ width: "85%" }}
                >
                  <div className="col-span-1 text-center">{t`new_register`}</div>
                  <div className="col-span-1 text-center">{t`new_su`}</div>
                  <div className="col-span-1 text-center">{t`new_ex`}</div>
                </div>
              </div>
            )}

            <div className="relative">
              {!loading &&
                list?.map((item, index) => {
                  return <EeachRow key={index} index={index} data={item} t={t} />;
                })}

              {!loading && list && list.length > 0 && (
                <EeachRow index={list.length} data={{ ...total, mth: "total" }} t={t} />
              )}

              {list?.length === 0 && (
                <div className="mt-12 mb-5 flex flex-col justify-center items-center">
                  {!loading && (
                    <>
                      <div>
                        <NoDataIcon />
                      </div>
                      <span className="mt-4">{t`no_data`}</span>
                    </>
                  )}
                  {loading && (
                    <div className="flex items-center justify-center w-full h-full">
                      <CircularProgress />
                    </div>
                  )}
                </div>
              )}

              {(!list || list.length > 0) && loading && (
                <div className="md:absolute mt-5 md:mt-0 top-8 left-0 flex items-center justify-center w-full">
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EeachRow = ({
  data,
  index,
  t,
}: {
  data: {
    new_ex: number | string;
    new_register: number | string;
    new_su: number | string;
    mth: string;
  };
  index: number;
  t?: (text: string) => string;
}) => {
  return (
    <div
      className={`w-full flex items-center rounded pl-3 pr-3 ${
        index % 2 === 0 ? "" : "bg-lighterGray"
      }`}
      style={{
        height: 70,
      }}
    >
      <div
        className={`text-sm lowercase first-letter:uppercase ${
          data.mth === "total" ? "font-medium" : ""
        }`}
        style={{ width: "15%" }}
      >
        <span>{t ? t(data.mth.toLowerCase()) : data.mth}</span>
      </div>
      <div className="text-sm grid grid-cols-3 md:gap-20" style={{ width: "85%" }}>
        <div className="col-span-1 text-center">
          <NumberFormatCustome value={data.new_register} />
        </div>
        <div className="col-span-1 text-center">
          <NumberFormatCustome value={data.new_su} />
        </div>
        <div className="col-span-1 text-center">
          <NumberFormatCustome value={data.new_ex} />
        </div>
      </div>
    </div>
  );
};

export default NewRegisterUpdateSuExSteam;
