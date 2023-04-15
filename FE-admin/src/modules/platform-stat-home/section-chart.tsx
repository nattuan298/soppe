import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { RootState } from "src/store";
import { DataTraction } from "src/types/dashboard.model";
import { LineChart, PieDonutChart, Spinner } from "src/components";
import { DesktopPlatform, MobilePlatform, NoDataIcon } from "src/components/icons";

export default function SectionChart() {
  const { t } = useTranslation("common");
  const { tractions, loading } = useSelector((state: RootState) => state.platformDashboard);
  const { tractionChart, totalTraction, dataPlatform } = tractions;

  const dataChart = useMemo(
    () =>
      tractionChart?.map((item: DataTraction) => {
        const date = new Date(item.date);
        return [date.getTime(), item.traction];
      }),
    [tractionChart],
  );

  const pieChartData = useMemo(() => {
    return [
      { name: "Desktop", y: dataPlatform?.desktop || 0, color: "#FF7500" },
      { name: "Mobile", y: dataPlatform?.mobile || 0, color: "#0075C9" },
    ];
  }, [dataPlatform]);

  if (loading) {
    return (
      <div className="w-full h-72 grid justify-items-center text-center mt-48">
        <div className="mt-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!dataPlatform && !tractionChart) {
    return (
      <div className="w-full h-72 grid justify-items-center text-center mt-48">
        <div className="mt-8">
          <NoDataIcon />
        </div>
        <p className="txt-no-data font-light">{t`no-data`}</p>
      </div>
    );
  }

  return (
    <div className="w-full pl-5 pr-5 m-auto">
      <div className="w-full gap-6 grid grid-cols-12 wide:grid-cols-12">
        <div className="rounded-navbar bg-white shadow-navbar col-span-9 py-6 px-9">
          <div className="text-xl font-medium text-black-primary mb-4">{t`traction`}</div>
          <div className="mt-0.5 text-orange-light mb-8 text-title-chart">{totalTraction}</div>
          {dataChart && dataChart.length !== 0 && (
            <LineChart data={dataChart} height={390} name={t`total`} />
          )}
        </div>
        <div className="h-full rounded-navbar bg-white shadow-navbar col-span-3 py-6 px-9">
          <div className="text-xl font-medium text-black-primary mb-12">{t`traction-by-device`}</div>
          <div className="w-full my-3">
            <PieDonutChart height={320} data={pieChartData} />
          </div>
          <div className="mx-9 flex justify-between items-center">
            <div className="flex justify-center flex-col items-center">
              <div className="mb-2.5">
                <DesktopPlatform />
              </div>
              <div className="text-base font-normal text-gray-light mb-1.5">{t`desktop`}</div>
              <div className="text-count-black font-normal text-xl">
                {dataPlatform?.desktop || 0}
              </div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <div className="mb-2.5">
                <MobilePlatform />
              </div>
              <div className="text-base font-normal text-gray-light mb-1.5">{t`mobile`}</div>
              <div className="text-count-black font-normal text-xl">
                {dataPlatform?.mobile || 0}
              </div>
            </div>
            {/* <div className="flex justify-center flex-col items-center">
              <div className="mb-2.5">
                <UnknownPlatform />
              </div>
              <div className="text-base font-normal text-gray-light mb-1.5">{t`unknow`}</div>
              <div className="text-count-black font-normal text-xl">106k</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
