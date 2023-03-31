import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import NoDataIcon from "src/components/svgs/no-data";
import NumberFormatCustome from "src/components/text/number-format";
import { NewPinSponsorType } from "types/api-response-type";

const MakePinOfDirectSponsorTeam = ({
  list,
  loading,
  header,
}: {
  list?: NewPinSponsorType[];
  loading: boolean;
  header: string[];
}) => {
  const headerLength = useMemo(() => {
    return header.length;
  }, [header]);

  const { dataArray, total } = useMemo(() => {
    // const result = { Jan: Ơ };
    const result: {
      [key: string]: {
        [key: string]: string;
      };
    } = {};
    const total: {
      [key: string]: number;
    } = {};
    if (list) {
      list.forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { posname, posid, yth, ...monthsObject } = item;
        total[posname] = 0;
        for (const [key, value] of Object.entries(monthsObject)) {
          const row = result[key];
          result[key] = row ? { ...row, [posname]: value } : { [posname]: value };
          total[posname] += parseFloat(value);
        }
      });
    }
    return { dataArray: result, total };
  }, [list]);

  const { t } = useTranslation("common");
  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
      <div className="md:flex mt-4 md:mt-6">
        <div className="md:col-span-2">
          <LeftNavinationReport />
        </div>
        <div className="w-full md:pl-20 md:flex-grow">
          <p className="text-sm font-medium md:w-full">
            {t("matching_pin_of_direct_sponsor_team")}
          </p>
          <div className="mt-5">
            <div className="flex bg-lighterGray h-8 items-center rounded pl-3 w-full pr-3">
              <div className="text-sm font-medium" style={{ width: "15%" }}>
                {t("month")}
              </div>
              <div className="text-sm font-medium text-center" style={{ width: "85%" }}>
                {t("pin")}
              </div>
            </div>

            {!loading && header.length > 0 && (
              <div className="flex bg-orangeLight h-8 items-center rounded pl-3 w-full pr-3 mt-2">
                <div className="text-sm" style={{ width: "15%" }} />
                <div
                  className={`text-[10px] md:text-sm grid text-orange gap-x-5 md:gap-x-0 grid-cols-${headerLength}`}
                  style={{ width: "85%" }}
                >
                  {header.map((item) => (
                    <div className="col-span-1 text-center">{item}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative">
              {!loading &&
                Object.entries(dataArray).map(([key, value], index) => {
                  return (
                    <EeachRow
                      key={index}
                      index={index}
                      title={key}
                      data={value}
                      itemsLength={headerLength}
                      header={header}
                      t={t}
                    />
                  );
                })}

              {!loading && Object.keys(dataArray).length > 0 && (
                <EeachRow
                  index={Object.keys(dataArray).length}
                  title={"total"}
                  data={total}
                  itemsLength={headerLength}
                  header={header}
                  t={t}
                />
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
  title,
  index,
  data,
  itemsLength,
  header,
  t,
}: {
  title: string;
  index: number;
  data: { [key: string]: string | number };
  itemsLength: number;
  header: string[];
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
          title === "total" ? "font-medium" : ""
        }`}
        style={{ width: "15%" }}
      >
        <span>{t ? t(title.toLowerCase()) : title.toLowerCase()}</span>
      </div>
      <div className={`text-sm grid grid-cols-${itemsLength}`} style={{ width: "85%" }}>
        {header.map((item, index) => {
          return (
            <div className="col-span-1 text-center" key={index}>
              <NumberFormatCustome value={data[item]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MakePinOfDirectSponsorTeam;
