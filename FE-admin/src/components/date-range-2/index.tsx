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
  defaultTo?: Date | undefined;
  handleSelect: (from: Date | undefined, to: Date | undefined) => void;
  maxDate?: Date | undefined;
  placeholder?: string;
  minDate?: Date;
  clearExpired?: boolean;
  error?: string | null;
  notAllowedUnexpired?: boolean;
}

export const InputDatePicker2 = ({
  className,
  handleSelect,
  defaultFrom,
  defaultTo,
  maxDate,
  clearExpired,
  minDate,
  placeholder = "",
  error,
  notAllowedUnexpired,
}: InputDateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const now = useMemo(() => new Date(), []);
  const [from, setFrom] = useState<Date>(now);
  const [to, setTo] = useState<Date | undefined>();
  const [expired, setExpired] = useState(false);

  const { t } = useTranslation("common");

  useEffect(() => {
    if (defaultFrom && defaultTo) {
      const newValue = `${format(defaultFrom, "dd-MM-yyyy")} ${t(
        "to",
      ).toLocaleLowerCase()} ${format(defaultTo, "dd-MM-yyyy")}`;
      setValue(newValue);
      setFrom(defaultFrom);
      setTo(defaultTo);
    } else if (defaultFrom && expired) {
      const newValue = `${format(defaultFrom, "dd-MM-yyyy")} ${t("to_unexpired")}`;
      setValue(newValue);
      setFrom(defaultFrom);
      setTo(undefined);
    } else if (defaultFrom && defaultTo === undefined) {
      const newValue = `${format(new Date(defaultFrom), "dd-MM-yyyy")} ${t("to_unexpired")}`;
      setValue(newValue);
      setFrom(defaultFrom);
      setTo(undefined);
    } else {
      setFrom(now);
      setTo(now);
      setValue("");
    }
  }, [defaultFrom, defaultTo, now, expired, localStorage.getItem("i18nextLng")]);

  useEffect(() => {
    setExpired(false);
  }, [clearExpired]);
  const inputClass = clsx(
    className && className,
    "w-full bg-white flex justify-between justify-items-center input",
  );
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (expired) {
      setFrom(from);
      setTo(undefined);
    }
  }, [expired, from]);
  const handleClose = async () => {
    if (from) {
      const newValue = `${format(from, "dd-MM-yyyy")} to ${
        to ? format(to, "dd-MM-yyyy") : "Unexpired"
      }`;
      setValue(newValue);
      if (to) {
        const now = new Date(to?.getFullYear(), to?.getMonth(), to?.getDate(), 23, 59, 59);
        const past = new Date(from.getFullYear(), from?.getMonth(), from?.getDate(), 0, 0, 0);
        handleSelect && handleSelect(past, now);
      } else {
        const past = new Date(from.getFullYear(), from?.getMonth(), from?.getDate(), 0, 0, 0);
        handleSelect && handleSelect(past, to);
      }
      setOpen(false);
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
    setExpired(false);
    handleSelect && handleSelect(undefined, undefined);
  };

  const handleSelectPicker = useCallback(
    ({ selection }) => {
      const { startDate, endDate } = selection;
      setFrom(startDate);
      expired ? setTo(undefined) : setTo(endDate);
    },
    [expired],
  );

  const handleChangeExpired = () => {
    setExpired(!expired);
  };
  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: expired ? undefined : to,
        key: "selection",
      },
    ];
  }, [from, to, expired]);

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
      <div className={clsx(inputClass, error && "ring-1 ring-red-light")} onClick={handleOpen}>
        <input
          placeholder={placeholder}
          disabled={true}
          className="bg-white placeholder-gray-primary text-sm"
          value={value}
        />
        <IconButton aria-label="calendar" onClick={handleOpen}>
          <CalendarIcon />
        </IconButton>
      </div>
      {error && <p className="text-sm text-red-light mt-2">{error}</p>}
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
          expired={expired}
          handleChangeExpired={handleChangeExpired}
          // minDate={new Date(now.getFullYear() - 10, 1, 1)}
          maxDate={maxDate}
          focusDate={focusDate}
          notAllowedUnexpired={notAllowedUnexpired}
        />
      </Modal>
    </Fragment>
  );
};
