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
  prefixName?: string;
  inRight?: boolean;
}

export function Select({
  placeholder,
  options,
  className,
  onChange,
  defaultValue,
  selectClassName,
  disableClick,
  classChevron,
  classHolder,
  showFullHeight,
  trans,
  prefixName,
  inRight = false,
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

  return (
    <div className={clsx(`relative select-custom ${showFullHeight ? "" : "sm:h-50"}`, className)}>
      <div
        className={`${
          styles.select
        } flex items-center justify-between bg-white ${selectClassName} p-3.5 ${
          isOpen && "border-orange"
        } ${disableClick && "bg-lighterGray"}
        ${showFullHeight ? "h-auto" : ""}`}
        role={!disableClick ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
        {...props}
      >
        {prefixName ? (
          <span className={clsx("text-sm")}>{prefixName}</span>
        ) : (
          <span className={clsx("text-sm", !value.title && (classHolder || "text-lightestGray"))}>
            {trans ? trans(`${value.title}`) || placeholder : value.title || placeholder}
          </span>
        )}

        <div>
          <div style={{ width: 20, height: 20 }}>
            {isOpen ? (
              <ChevronUp className={clsx(classChevron)} />
            ) : (
              <ChevronDown className={clsx(classChevron)} />
            )}
          </div>
        </div>
      </div>
      <div
        style={{ marginRight: "-4px" }}
        className={`absolute right-0 ${!inRight && "left-0"} z-10 ${isOpen ? "block" : "hidden"}`}
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
