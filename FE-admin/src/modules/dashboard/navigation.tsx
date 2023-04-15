import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLinkDataExportDashboard } from "src/services/export-data.services";

import { ParamListRequestDashBoard } from "src/types/params-list-request.model";
import { SelectCountry2 } from "src/components/select-country-2";

import dayjs from "dayjs";

import { Button, InputDatePicker } from "src/components";

interface NavigationProps {
  setParams: (params: ParamListRequestDashBoard) => void;
}

export default function NavigationDashboard({ setParams }: NavigationProps) {
  const { t } = useTranslation("common");

  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [locationFilter, setLocationFilter] = useState({
    id: "locationBase",
    name: "Thailand",
  });

  useEffect(() => {
    const now = dayjs();
    const month = now.month();
    const days = now.daysInMonth();
    const year = now.year();
    const form = new Date(year, month, 1);
    const to = new Date(year, month, days);
    setFrom(form);
    setTo(to);
  }, []);

  useEffect(() => {
    if (!from || !to) {
      return;
    }
    const startDate = dayjs(from).format("YYYY-MM-DD");
    const endDate = dayjs(to).format("YYYY-MM-DD");
    const country = locationFilter.name;
    setParams({ startDate, endDate, country });
  }, [from?.toISOString(), to?.toISOString(), locationFilter]);

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

  function handleChangeLocation(value: string) {
    if (value) {
      setLocationFilter({
        id: "locationBase",
        name: value,
      });
    }
  }

  const handleExport = async () => {
    const startDate = dayjs(from).format("YYYY-MM-DD");
    const endDate = dayjs(to).format("YYYY-MM-DD");
    const res = await getLinkDataExportDashboard({
      startDate,
      endDate,
      country: locationFilter.name,
    });
    if (!res) {
      return;
    }
    window.open(res, "_blank");
  };

  return (
    <div className="p-5 m-auto">
      <div className="w-full rounded-navbar bg-white shadow-navbar flex justify-between items-center nav-home">
        <div className="flex float-left ">
          <label className="">
            <span className="float-left medium:text-sm large:text-4xl pl-5 pb-1.5">{t`date-range`}</span>
            <div className="pl-5 pt-6">
              <InputDatePicker
                handleSelect={handleSelectDate}
                className="h-[50px] w-[343px] float-left pl-4 placeholder-italic"
                defaultFrom={from}
                defaultTo={to}
                placeholder={t("all")}
              />
            </div>
          </label>
          <label className="">
            <span className="float-left medium:text-sm large:text-4xl pl-6 pb-1.5">{t`location-base`}</span>
            <div className="pl-6 pt-6">
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
            filename="total-price.csv"
            headers={headers}
            className="bg-orange-light text-base	text-white ml-6 px-6 max-w-xs hover:bg-orange-hover export"
          ></ExportButton> */}
          <Button
            className="bg-orange-light text-base	text-white ml-6 px-6 max-w-xs hover:bg-orange-hover export"
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
