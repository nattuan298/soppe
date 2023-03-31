import { ClickAwayListener } from "@material-ui/core";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar as CalendarComponent } from "src/components/svgs";
import styles from "./styles.module.css";
import { enUS, th } from "date-fns/locale";
import useTranslation from "next-translate/useTranslation";
interface DatePickerType {
  className?: string;
  onChange?: (date: Date) => void;
  defaultDate: Date;
  maxDate?: Date | undefined;
  minDate?: Date | undefined;
  disabled?: boolean;
}

export function DatePicker({
  className,
  defaultDate,
  onChange,
  maxDate = undefined,
  minDate = undefined,
  disabled,
}: DatePickerType) {
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(defaultDate);
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useTranslation("common");
  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  const handleSelect = (date: Date) => {
    setDate(date);
    setIsOpenCalendar(false);
    onChange && onChange(date);
  };
  const openCalendar = () => {
    if (disabled) {
      return;
    }
    setIsOpenCalendar(true);
  };

  const onClickAway = () => {
    setIsOpenCalendar(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="relative">
        <div
          className={`${
            styles.border
          } flex items-center justify-between mb-1 bg-white p-3.5 h-50 ${className} ${
            disabled && "bg-lighterGray"
          }`}
          role={!disabled ? "button" : undefined}
          onClick={openCalendar}
          ref={ref}
          // {...props}
        >
          <span className="text-sm">{dayjs(date).format("DD - MM - YYYY")}</span>
          <CalendarComponent />
        </div>
        {isOpenCalendar && (
          <div className={`${styles.dateContainer} flex justify-center absolute w-full z-10`}>
            <Calendar
              classNames={{
                selected: styles.backgroundColor,
                dayStartPreview: styles.color,
                monthPicker: styles.border,
                yearPicker: styles.border,
              }}
              date={date}
              onChange={handleSelect}
              rangeColors={["#ff7500"]}
              color="#ffffff"
              weekStartsOn={1}
              maxDate={maxDate}
              minDate={minDate}
              locale={lang === "th" ? th : enUS}
            />
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
