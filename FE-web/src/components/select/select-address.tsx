import { MouseEvent, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { ChevronDown, ChevronUp } from "../svgs";
import styles from "./styles.module.css";
import useTranslation from "next-translate/useTranslation";

interface OptionProps {
  onSelect: () => void;
  isSeleted?: boolean;
  infor: string;
  address: string;
  image?: string;
}

const Option = forwardRef<HTMLDivElement, OptionProps>(
  ({ onSelect, isSeleted, infor, address }, ref) => {
    const props = isSeleted ? { ref } : {};
    return (
      <div
        className={`${
          isSeleted && "text-orange"
        } hover:text-orange cursor-pointer flex flex-col justify-center p-3.5`}
        onMouseDown={onSelect}
        style={{ height: 70 }}
        {...props}
      >
        <p className="sm:line-clamp-1">{infor}</p>
        <p className="sm:line-clamp-1">{address}</p>
      </div>
    );
  },
);

type OptionType = {
  infor: string;
  address: string;
  value: string;
  addressEng: string;
};
export interface SelectProps {
  options: OptionType[];
  onChange?: (e: OptionType) => void;
  defaultValue?: string;
  className?: string;
  selectClassName?: string;
  disableClick?: boolean;
  classChevron?: string;
}

const emptyValue = {
  infor: "",
  address: "",
  value: "",
  addressEng: "",
};

export default function SelectAddress({
  options,
  className,
  onChange,
  defaultValue,
  selectClassName,
  disableClick,
  classChevron,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<OptionType>(
    options.find((option) => option.value === defaultValue) || emptyValue,
  );
  const { t, lang } = useTranslation("common");
  const selectRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLDivElement>(null);
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
    setValue(options.find((option) => option.value === defaultValue) || emptyValue);
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
    <div
      className={clsx("relative select-custom", className)}
      style={{ height: value.address ? "auto" : 50 }}
    >
      <div
        className={`${
          styles.select
        } flex items-center justify-between mb-1 bg-white p-3.5 ${selectClassName} ${
          isOpen && "border-orange"
        } ${disableClick && "bg-lighterGray"}`}
        role={!disableClick ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
        style={{ height: value.address ? "auto" : 50 }}
        {...props}
      >
        {value.address && (
          <div>
            <span className={clsx("text-sm block sm:line-clamp-1")}>{value.infor}</span>
            <span className={clsx("text-sm block sm:line-clamp-1")}>
              {lang === "en" ? value.addressEng : value.address}
            </span>
          </div>
        )}

        {!value.address && (
          <div>
            <span className="text-sm text-lighterGray">{t`select_address`}</span>
          </div>
        )}

        {isOpen ? (
          <ChevronUp className={clsx(classChevron)} />
        ) : (
          <ChevronDown className={clsx(classChevron)} />
        )}
      </div>
      <div
        style={{ marginRight: "-4px" }}
        className={`absolute right-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}
      >
        <ul className={`${styles.options} bg-white p-r-1`} ref={ulRef}>
          {options.map((option, index) => (
            <Option
              key={index}
              infor={option.infor}
              address={lang === "en" ? option.addressEng : option.address}
              onSelect={handleClickSelectOption(option)}
              isSeleted={value.value === option.value}
              ref={liRef}
            />
          ))}
          {options.length === 0 && (
            <div className="text-center flex justify-center items-center h-50">
              {t`no_address_available_for_shipping`}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
