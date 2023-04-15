import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// import { RootState } from "src/store";
import { Button, InputDatePicker } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";
import { getLinkDataExportPlatForm } from "src/services/export-data.services";
import { fetchPlatformDashboard } from "src/store/platform-dashboard.action";

// const headers = [
//   {
//     label: "Date",
//     key: "date",
//   },
//   {
//     label: "Total Price",
//     key: "totalPrice",
//   },
// ];

export default function NavigationDashboard() {
  const { t } = useTranslation("common");

  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [locationFilter, setLocationFilter] = useState({
    id: "locationBase",
    name: "Thailand",
  });

  const dispatch = useDispatch();
  // const { tractions } = useSelector((state: RootState) => state.platformDashboard);
  // const { tractionChart } = tractions;

  // const data = useMemo(
  //   () =>
  //     tractionChart.map((item) => {
  //       const date = new Date(item.date);
  //       return { date: date.toISOString(), totalPrice: item.traction };
  //     }),
  //   [tractionChart],
  // );

  const setDefaultDate = () => {
    const now = dayjs();
    const month = now.month();
    const days = now.daysInMonth();
    const year = now.year();
    const form = new Date(year, month, 1);
    const to = new Date(year, month, days);
    setFrom(form);
    setTo(to);
  };

  useEffect(() => {
    setDefaultDate();
  }, []);

  const getData = useCallback(() => {
    if (!from || !to) {
      return;
    }
    const startDate = dayjs(from).format("YYYY-MM-DD");
    const endDate = dayjs(to).format("YYYY-MM-DD");
    const country = locationFilter.name;
    dispatch(fetchPlatformDashboard({ startDate, endDate, country }));
  }, [from?.toISOString(), to?.toISOString(), locationFilter]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSelectDate = useCallback(
    (startDate, endDate) => {
      if ((startDate === null || endDate === null) && from && to) {
        setFrom(new Date(from.toISOString()));
        setTo(new Date(to.toISOString()));
        return;
      }
      setFrom(startDate);
      setTo(endDate);
    },
    [from, to],
  );

  const handleExport = async () => {
    const startDate = dayjs(from).format("YYYY-MM-DD");
    const endDate = dayjs(to).format("YYYY-MM-DD");
    const country = locationFilter.name;
    const res = await getLinkDataExportPlatForm({ startDate, endDate, country });
    if (!res) {
      return;
    }
    window.open(res, "_blank");
  };

  const handleChangeLocation = (value: string) => {
    if (value) {
      setLocationFilter({
        id: "locationBase",
        name: value,
      });
    }
  };

  return (
    <div className="p-5 m-auto">
      <div className="h-[104px] w-full rounded-navbar bg-white shadow-navbar flex justify-between items-center">
        <div className="flex float-left ">
          <label className="">
            <span className="float-left medium:text-sm large:text-4xl pl-5 pb-1.5">{t`date-range`}</span>
            <div className="pl-5 pt-6">
              <InputDatePicker
                handleSelect={handleSelectDate}
                className="h-[50px] float-left w-[343px] pl-4 placeholder-italic"
                defaultFrom={from}
                defaultTo={to}
                placeholder={t("all")}
              />
            </div>
          </label>
          <label className="">
            <span className="float-left medium:text-sm large:text-4xl pl-5 pb-1.5">{t`location-base`}</span>
            <div className="pl-5 pt-6">
              <SelectCountry2
                country={locationFilter.name}
                onSelect={handleChangeLocation}
                className="w-[343px]"
              />
            </div>
          </label>
        </div>
        <div className="flex w-62/100 justify-end seach-component mr-5">
          {/* <ExportButton
            data={data}
            filename="total-price3.csv"
            headers={headers}
            className="bg-orange-light text-base	text-white ml-6 px-6 max-w-xs hover:bg-orange-hover export"
          ></ExportButton> */}
          <Button
            className="bg-orange-light text-base h-50	text-white py-3 ml-6 px-6 max-w-xs hover:bg-orange-hover export"
            variant="text"
            onClick={handleExport}
          >
            {t`export`}
          </Button>
        </div>
      </div>
    </div>
  );
}
