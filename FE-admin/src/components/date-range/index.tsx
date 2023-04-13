import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import clsx from "clsx";
import "./styles.css";

import { CalendarIcon } from "../icons";
import { DateRangePickerCustomer } from "./picker";
import { useTranslation } from "react-i18next";

interface InputDateProps {
  className?: string;
  defaultFrom?: Date | null;
  defaultTo?: Date | null;
  handleSelect: (from: Date | null, to: Date | null) => void;
  maxDate?: Date;
  placeholder?: string;
  minDate?: Date;
}

export const InputDatePicker = ({
  className,
  handleSelect,
  defaultFrom,
  defaultTo,
  maxDate,
  minDate,
  placeholder = "",
}: InputDateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const now = useMemo(() => new Date(), []);
  const [from, setFrom] = useState<Date>(now);
  const [to, setTo] = useState<Date>(now);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (defaultFrom && defaultTo) {
      const newValue = `${format(defaultFrom, "dd-MM-yyyy")} ${t(
        "to",
      ).toLocaleLowerCase()} ${format(defaultTo, "dd-MM-yyyy")}`;
      setValue(newValue);
      setFrom(defaultFrom);
      setTo(defaultTo);
    } else {
      setFrom(now);
      setTo(now);
      setValue("");
    }
  }, [defaultFrom, defaultTo, now, localStorage.getItem("i18nextLng")]);

  const inputClass = clsx(
    className && className,
    "w-full bg-white flex justify-between justify-items-center input",
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (from && to) {
      setOpen(false);
      const newValue = `${format(from, "dd-MM-yyyy")} ${t("to") as "to_ship"} ${format(
        to,
        "dd-MM-yyyy",
      )}`;
      setValue(newValue);
      const now = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
      const past = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
      handleSelect && handleSelect(past, now);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    if (defaultFrom && defaultTo) {
      setFrom(defaultFrom);
      setTo(defaultTo);
    } else {
      setFrom(now);
      setTo(now);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setValue("");
    setFrom(now);
    setTo(now);
    handleSelect && handleSelect(null, null);
  };

  const handleSelectPicker = useCallback(({ selection }) => {
    const { startDate, endDate } = selection;
    setFrom(startDate);
    setTo(endDate);
  }, []);

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection",
      },
    ];
  }, [from, to]);

  const focusDate = useMemo(() => {
    if (
      maxDate?.getDate() === now.getDate() &&
      maxDate?.getMonth() === now.getMonth() &&
      maxDate?.getFullYear() === now.getFullYear()
    ) {
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    }
    if (defaultTo) {
      return defaultTo;
    }
    return undefined;
  }, [maxDate, defaultTo, now]);

  return (
    <Fragment>
      <div className={inputClass} onClick={handleOpen}>
        <input
          placeholder={placeholder}
          disabled={true}
          value={value}
          className="bg-white placeholder-gray-primary text-sm"
        />
        <IconButton aria-label="calendar" onClick={handleOpen}>
          <CalendarIcon />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="date-range-modal-title"
        aria-describedby="date-range-modal-description"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <DateRangePickerCustomer
          ranges={ranges}
          minDate={minDate}
          onChange={handleSelectPicker}
          handleClose={handleClose}
          handleCancel={handleCancel}
          // minDate={new Date(now.getFullYear() - 10, 1, 1)}
          maxDate={maxDate}
          focusDate={focusDate}
        />
      </Modal>
    </Fragment>
  );
};
