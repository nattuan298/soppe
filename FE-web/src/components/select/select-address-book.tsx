/* eslint-disable indent */
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Option from "./option";
import { ChevronDown, ChevronUp } from "../svgs";
import styles from "./styles.module.css";
import useTranslation from "next-translate/useTranslation";
import { FormHelperText } from "@material-ui/core";

type OptionType = {
  name: string;
  _id: string;
  nameEng: string;
};
export interface SelectProps {
  placeholder?: string;
  options: OptionType[] | undefined;
  onChange?: (value: string, title: string) => void;
  defaultValue?: string;
  className?: string;
  selectClassName?: string;
  disableClick?: boolean;
  classChevron?: string;
  classHolder?: string;
  error?: string;
  country?: string;
  trans?: (text: string) => string;
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
  error,
  trans,
  ...props
}: SelectProps) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<OptionType>(
    options?.find((option) => option.nameEng === defaultValue || option.name === defaultValue) || {
      nameEng: "",
      _id: "",
      name: "",
    },
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [displayText, setDisplayText] = useState<string | null>("");

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
    if (defaultValue) {
      const defaultOption = options?.find((option) => option._id === defaultValue);
      const defaultOptionTitle = options?.find(
        (option) => option.nameEng === defaultValue || option.name === defaultValue,
      );
      if (defaultOption) {
        const _id = defaultOption?._id;
        const nameEng = defaultOption?.nameEng;
        const name = defaultOption?.name;
        setDisplayText(defaultOption.nameEng);
        setValue({ nameEng, _id, name });
      } else if (defaultOptionTitle) {
        const _id = defaultOptionTitle?._id;
        const nameEng = defaultOptionTitle?.nameEng;
        const name = defaultOptionTitle?.name;
        setDisplayText(defaultOptionTitle.nameEng);
        setValue({ _id, nameEng, name });
      }
    } else {
      setValue({ nameEng: "", _id: "", name: "" });
      setDisplayText("");
    }
  }, [defaultValue, options]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        if (options !== undefined) {
          let index: number = options?.findIndex((ele) => {
            return ele.nameEng === value.nameEng;
          });

          const arrLength = options?.length;
          if (event.key === "ArrowDown") {
            index = index < arrLength - 1 ? index + 1 : 0;
          }
          if (event.key === "ArrowUp") {
            index = index > 0 ? index - 1 : arrLength - 1;
          }
          setValue(
            options
              ? options[index]
              : {
                  nameEng: "",
                  _id: "",
                  name: "",
                },
          );
        }
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
    if (
      !isOpen &&
      value._id !== defaultValue &&
      value.nameEng !== defaultValue &&
      value.name !== defaultValue
    ) {
      onChange?.(value.nameEng, value._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, value]);

  return (
    <div className={clsx("relative h-50 select-custom", className)}>
      <div
        className={`${
          styles.select
        } flex items-center justify-between mb-1 bg-white p-3.5 ${selectClassName} ${
          isOpen && "border-orange"
        } ${disableClick && "bg-lighterGray"} ${error && "border border-red"}`}
        role={!disableClick ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
        {...props}
      >
        <p className={clsx("text-sm", !displayText && "text-textSearch")}>
          {displayText || placeholder}
        </p>

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
          {options?.map((option) => (
            <Option
              key={option._id}
              name={option.nameEng}
              onSelect={handleClickSelectOption(option)}
              isSeleted={value._id === option._id}
              ref={liRef}
            />
          ))}
          {options
            ? options.length === 0 && <div className="flex p-4 justify-center">{t`no_data`}</div>
            : [].length === 0 && <div className="flex p-4 justify-center">{t`no_data`}</div>}
        </ul>
      </div>
      {error && <FormHelperText error>{trans ? trans(`${error}`) : error}</FormHelperText>}
    </div>
  );
}
