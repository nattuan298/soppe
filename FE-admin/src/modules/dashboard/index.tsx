import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "src/store";
import { LineChart, Spinner } from "src/components";
import NavigationDashboard from "./navigation";
import SectionCounter from "./section-counter";
import { fetchHomeDashboard } from "src/store/dashboard.action";
import { ParamListRequestDashBoard } from "src/types/params-list-request.model";
import { DataSale } from "src/types/dashboard.model";
import { NoDataIcon } from "src/components/icons";
import { LOCALBASE, getSymbolCurrencyLocalbase } from "src/lib/format";
import "./styles.css";

export function Dashboard() {
  const { t } = useTranslation("common");
  const [params, setParams] = useState<ParamListRequestDashBoard | null>(null);
  const dispatch = useDispatch();

  const { dashboard, loading } = useSelector((state: RootState) => state.dashboard);
  const { conversionRate, dataSales, numberOrder, numberUser, totalSale, totalTraction, unit } =
    dashboard;

  const getData = useCallback(() => {
    if (!params) {
      return;
    }
    dispatch(fetchHomeDashboard(params));
  }, [fetchHomeDashboard, params]);

  useEffect(() => {
    getData();
  }, [getData]);

  const dataChart = useMemo(
    () =>
      dataSales?.map((item: DataSale) => {
        const date = new Date(item.dateTime);
        return [date.getTime(), item.totalPrice];
      }),
    [dataSales],
  );

  if (
    !dataSales &&
    !totalSale &&
    !totalTraction &&
    !conversionRate &&
    !numberOrder &&
    !numberUser
  ) {
    return (
      <div className="w-full h-72 grid justify-items-center text-center mt-48">
        <div className="mt-8">
          <NoDataIcon />
        </div>
        <p className="txt-no-data font-light">{t`no-data`}</p>
      </div>
    );
  }

  const currency = getSymbolCurrencyLocalbase(unit as LOCALBASE);
  const total = totalSale.toLocaleString();

  return (
    <div className="-mb-10">
      <NavigationDashboard setParams={setParams} />
      {loading ? (
        <div className="my-5">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div></div>
        </Fragment>
      )}
    </div>
  );
}
