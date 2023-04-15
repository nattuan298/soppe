import { MouseEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Calendar } from "react-date-range";
import { enGB, th } from "date-fns/locale";
import clsx from "clsx";

import { CalendarIcon } from "../icons";
import { Input } from "../input";
import { useStyles } from "./styles";
import "./styles.css";

interface DatePickerProps {
  value?: any;
  className?: string;
  onChange?: (value: any) => void;
  disable?: boolean;
  hasMaxDate?: boolean;
  minDate?: Date;
}

export function DatePicker({
  className,
  onChange,
  value,
  disable,
  hasMaxDate = true,
  minDate,
}: DatePickerProps) {
  const [dateValue, setDateValue] = useState<Date>();
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const lang = localStorage.getItem("i18nextLng");
  const { datePicker } = useStyles();

  useEffect(() => {
    if (value) setDateValue(new Date(value));
  }, [value]);

  function handleChangeDate(range: any) {
    setIsOpenCalendar(false);
    setDateValue(range);
    onChange && onChange(range);
  }
  function handleClickOpenCalender(event: MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    if (disable) {
      return;
    }
    const [input] = event.currentTarget.getElementsByClassName("MuiInputBase-input");
    (input as HTMLInputElement).blur();
    setIsOpenCalendar(!isOpenCalendar);
  }
  function handleClickAway() {
    setIsOpenCalendar(false);
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={`${disable ? "pointer-events-none" : "bg-white"} date-picker relative`}>
          <Input
            disabled={disable}
            fullWidth
            className={clsx(datePicker, className && className)}
            value={dateValue ? dayjs(dateValue).format("DD-MM-YYYY") : ""}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <CalendarIcon />
                </IconButton>
              </InputAdornment>
            }
            onClick={handleClickOpenCalender}
          />
          {isOpenCalendar && (
            <div className="absolute z-10 date-picker-container mt-4">
              <Calendar
                locale={lang === "th" ? th : enGB}
                classNames={{
                  selected: "selected",
                  day: "day",
                  dayStartPreview: "day",
                  dayToday: "day",
                  weekDay: "week-day",
                  monthPicker: "date-picker-border",
                  yearPicker: "date-picker-border",
                }}
                maxDate={hasMaxDate ? new Date() : undefined}
                minDate={minDate}
                date={dateValue || ""}
                onChange={handleChangeDate}
              />
            </div>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
}
