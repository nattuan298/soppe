import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Option from "./option";
import { ChevronDown, ChevronUp } from "../svgs";
import styles from "./styles.module.css";
import useTranslation from "next-translate/useTranslation";

type OptionType = {
  title: string;
  value: string;
  flag: string;
};
export interface SelectProps {
  placeholder?: string;
  onChange?: (e: OptionType) => void;
  defaultValue?: string | null;
  className?: string;
  selectClassName?: string;
  disableClick?: boolean;
  classChevron?: string;
  classHolder?: string;
  showFullHeight?: boolean;
  classNameTextField?: string;
}

export function SelectLanguage({
  placeholder,
  className,
  onChange,
  defaultValue,
  selectClassName,
  disableClick,
  classChevron,
  showFullHeight,
  classNameTextField,
  ...props
}: SelectProps) {
  const { t } = useTranslation("common");
  const valueLanguage = [
    {
      title: t`thai_language`,
      value: "th",
      flag: "/assets/images/country/thailand.svg",
    },
    {
      title: t`english`,
      value: "en",
      flag: "/assets/images/country/united-states.svg",
    },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<OptionType>(
    valueLanguage.find((option) => option.value === defaultValue) || {
      title: "",
      value: "",
      flag: "",
    },
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
    setValue(
      valueLanguage.find((option) => option.value === defaultValue) || {
        title: "",
        value: "",
        flag: "",
      },
    );
  }, [defaultValue]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        let index: number = valueLanguage.findIndex((ele) => {
          return ele.value === value.value;
        });

        const arrLength = valueLanguage.length;
        if (event.key === "ArrowDown") {
          index = index < arrLength - 1 ? index + 1 : 0;
        }
        if (event.key === "ArrowUp") {
          index = index > 0 ? index - 1 : arrLength - 1;
        }

        setValue(valueLanguage[index]);
      }
      if (["Enter", "Escape"].includes(event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsOpen(false);
      }
    },
    [value],
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
    <div className={clsx(`relative select-custom ${showFullHeight ? "" : "h-50"}`, className)}>
      <div
        className={`${
          styles.select
        } flex items-center justify-between mb-1 bg-white ${selectClassName} p-3.5 ${
          isOpen && "border-orange"
        } ${disableClick && "bg-lighterGray"}
        ${showFullHeight ? "h-auto" : ""}`}
        role={!disableClick ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
        {...props}
      >
        <div className="flex items-center">
          <img src={value.flag} alt="img" className="mr-2 w-[17px] sm:w-5 h-[17px] sm:h-5" />
          <span className={`${classNameTextField} sm:text-sm text-black-dark`}>
            {" "}
            {value.title || placeholder}
          </span>
        </div>
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
        className={`absolute right-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}
      >
        <ul className={`${styles.options} bg-white p-r-1 text-black-dark`} ref={ulRef}>
          {valueLanguage.map((option) => (
            <Option
              key={option.title}
              name={option.title}
              onSelect={handleClickSelectOption(option)}
              isSeleted={value.value === option.value}
              ref={liRef}
              image={option.flag}
              showFullHeight
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
