import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Option from "./option";
import { ChevronDown, ChevronUp } from "../svgs";
import styles from "./styles.module.css";
import useTranslation from "next-translate/useTranslation";

type OptionType = {
  title: string;
  value: string;
};
export interface SelectProps {
  placeholder?: string;
  options: OptionType[];
  onChange?: (e: OptionType) => void;
  defaultValue?: string | null;
  className?: string;
  selectClassName?: string;
  disableClick?: boolean;
  classChevron?: string;
  classHolder?: string;
  showFullHeight?: boolean;
  trans?: (text: string) => string;
}

export function SelectNoteStatus({
  placeholder,
  options,
  className,
  onChange,
  defaultValue,
  selectClassName,
  disableClick,
  classChevron,
  showFullHeight,
  trans,
  ...props
}: SelectProps) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<OptionType>(
    options.find((option) => option.value === defaultValue) || { title: "", value: "" },
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickCloseSelect(event: Event) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickCloseSelect);

    // Clean up
    return () => document.removeEventListener("mousedown", handleClickCloseSelect);
  }, [selectRef]);

  useEffect(() => {
    if (isOpen) {
      ulRef.current?.scrollTo({ behavior: "smooth", top: liRef.current?.offsetTop });
    }
  }, [isOpen, value]);

  useEffect(() => {
    setValue(options.find((option) => option.value === defaultValue) || { title: "", value: "" });
  }, [defaultValue, options]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        let index: number = options.findIndex((ele) => {
          return ele.value === value.value;
        });

        const arrLength = options.length;
        if (event.key === "ArrowDown") {
          index = index < arrLength - 1 ? index + 1 : 0;
        }
        if (event.key === "ArrowUp") {
          index = index > 0 ? index - 1 : arrLength - 1;
        }

        setValue(options[index]);
      }
      if (["Enter", "Escape"].includes(event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsOpen(false);
      }
    },
    [value, options],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyPress);
    }
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, onKeyPress]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    if (disableClick) {
      return;
    }
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  const handleClickSelectOption = (option: OptionType) => () => {
    setValue(option);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen && value.value !== defaultValue) {
      onChange?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, value]);
  const getStatus = (status: string) => {
    switch (status) {
      case "Joined":
        return "bg-orange text-white ";
      case "Contact Back Again":
        return "bg-blue text-white";
      case "Not Interest":
        return "bg-lighterGray text-brown";
      case "Interest":
        return "bg-orangeLight";
      case "Waiting for the first contact":
        return "bg-lighterGray";
    }
  };
  const getStatusChevron = (status: string) => {
    switch (status) {
      case "Joined":
        return "#ffffff";
      case "Contact Back Again":
        return "#ffffff";
    }
  };
  return (
    <div className={clsx(`relative select-custom ${showFullHeight ? "" : "h-50"}`, className)}>
      <div
        className={`${styles.select} flex ${getStatus(
          value.value,
        )} items-center justify-between mb-1${selectClassName} p-3.5 ${isOpen && "border-orange"} ${
          disableClick && "bg-lighterGray"
        }
        ${showFullHeight ? "h-auto" : ""}`}
        role={!disableClick ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
        {...props}
      >
        <span className={clsx("text-sm", `${value.value === "Not Interest" ? "text-brown" : ""}`)}>
          {trans ? trans(`${value.title}`) || placeholder : value.title || placeholder}
        </span>
        <div>
          <div style={{ width: 20, height: 20 }}>
            {isOpen ? (
              <ChevronUp className={clsx(classChevron)} fill={`${getStatusChevron(value.value)}`} />
            ) : (
              <ChevronDown
                className={clsx(classChevron)}
                fill={`${getStatusChevron(value.value)}`}
              />
            )}
          </div>
        </div>
      </div>
      <div
        style={{ marginRight: "-4px" }}
        className={`absolute right-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}
      >
        <ul className={`${styles.options} bg-white p-r-1`} ref={ulRef}>
          {options.map((option) => (
            <Option
              key={trans ? trans(`${option.title}`) : option.title}
              name={trans ? trans(`${option.title}`) : option.title}
              onSelect={handleClickSelectOption(option)}
              isSeleted={value.value === option.value}
              ref={liRef}
              showFullHeight
            />
          ))}
          {options.length === 0 && <div className="flex p-4 justify-center">{t`no_data`}</div>}
        </ul>
      </div>
    </div>
  );
}
