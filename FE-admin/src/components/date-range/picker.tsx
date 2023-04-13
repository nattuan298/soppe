import { DateRange, DateRangeProps } from "react-date-range";
import { enGB, th } from "date-fns/locale";
import { Button } from "src/components";
import { useTranslation } from "react-i18next";
import "./styles.css";

interface DateRangePickerCustomerProps extends DateRangeProps {
  handleClose?: () => void;
  handleCancel?: () => void;
  focusDate?: Date;
}

export const DateRangePickerCustomer = ({
  ranges,
  minDate,
  maxDate,
  onChange,
  handleClose,
  handleCancel,
  focusDate,
}: DateRangePickerCustomerProps) => {
  const { t } = useTranslation("common");
  const lang = localStorage.getItem("i18nextLng");
  const cancelButtonClass =
    "bg-white text-orange-light w-24 border border-orange-light border-solid hover:border-orange-hover hover:text-orange-hover";
  const confirmButtonClass =
    "ml-2 w-24 bg-orange-light text-white hover:bg-orange-hover confirm-button";
  return (
    <div className="bg-white flex flex-col p-2 date-picker date-range">
      <DateRange
        locale={lang === "th" ? th : enGB}
        dateDisplayFormat={"yyyy.MM.dd"}
        monthDisplayFormat={"MMMM yyyy"}
        moveRangeOnFirstSelection={false}
        minDate={minDate}
        maxDate={maxDate}
        ranges={ranges}
        onChange={onChange}
        showDateDisplay={false}
        months={2}
        direction={"horizontal"}
        showPreview={false}
        showSelectionPreview={false}
        shownDate={focusDate}
        classNames={{
          day: "day",
          dayStartPreview: "day",
          dayToday: "day",
          weekDay: "week-day",
          monthPicker: "date-picker-border",
          yearPicker: "date-picker-border",
        }}
      />
      <div className="flex justify-end">
        <Button className={cancelButtonClass} onClick={handleCancel}>
          {t("cancel")}
        </Button>
        <Button className={confirmButtonClass} onClick={handleClose}>
          {t("ok")}
        </Button>
      </div>
    </div>
  );
};
