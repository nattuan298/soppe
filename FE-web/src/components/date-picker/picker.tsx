import { DateInputType, DateRange, OnChangeProps, Range } from "react-date-range";
import { ButtonMui } from "src/components";
import useTranslation from "next-translate/useTranslation";
import { enUS, th } from "date-fns/locale";
interface DateRangePickerCustomerProps {
  handleClose?: () => void;
  handleCancel?: () => void;
  focusDate?: Date;
  ranges?: Range[];
  minDate?: DateInputType;
  maxDate?: DateInputType;
  onChange?: ((range: OnChangeProps) => void) | undefined;
  screen?: string;
}

export const DateRangePickerCustomer = ({
  ranges,
  minDate,
  maxDate,
  onChange,
  handleClose,
  handleCancel,
  focusDate,
  screen,
}: DateRangePickerCustomerProps) => {
  const { t, lang } = useTranslation("common");
  return (
    <div className="bg-white flex flex-col p-2 date-picker date-range scm-picker">
      <DateRange
        locale={lang === "th" ? th : enUS}
        dateDisplayFormat={"yyyy.MM.dd"}
        monthDisplayFormat={"MMMM yyyy"}
        moveRangeOnFirstSelection={false}
        minDate={minDate}
        maxDate={maxDate}
        ranges={ranges}
        onChange={onChange}
        showDateDisplay={false}
        months={screen! === "Desktop" ? 2 : 1}
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
        <ButtonMui
          onClick={handleCancel}
          variant="outlined"
          fullWidth={false}
          height={40}
          className="w-20 mr-2"
        >
          {t`cancel`}
        </ButtonMui>

        <ButtonMui onClick={handleClose} fullWidth={false} height={40} className="w-20">
          {t`ok`}
        </ButtonMui>
      </div>
    </div>
  );
};
