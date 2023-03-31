import dayjs from "dayjs";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "../svgs";
import { enUS, th } from "date-fns/locale";
import useTranslation from "next-translate/useTranslation";

interface DatePickerType {
  onChange?: (date: Date) => void;
}
export function DateMonth({ onChange }: DatePickerType) {
  const [date, setDate] = useState(new Date());
  const handleCalendarClose = () => {};
  const handleCalendarOpen = () => {};
  const { lang } = useTranslation("common");

  return (
    <div className="flex items-center text-base cursor-pointer">
      <DatePicker
        locale={lang === "th" ? th : enUS}
        dateFormat="MMM yyyy"
        showMonthYearPicker
        selected={date}
        onChange={(date: Date) => {
          setDate(date);
          onChange && onChange(date);
        }}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        customInput={
          <input
            className="cursor-pointer"
            value={dayjs(date).format("MMM YYYY")}
            type="button"
            style={{ backgroundColor: "#ffffff" }}
          />
        }
      />
      <ChevronDown fill="#ff7500" />
    </div>
  );
}
