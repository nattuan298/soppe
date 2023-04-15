import { MouseEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { ChevronDown, ChevronUp } from "../icons";
import "./styles.css";
import { Label } from "../input";
import { useTranslation } from "react-i18next";

interface OptionProps {
  title: string;
  value: string | number | boolean;
  onSelect: (value: string | null, title: string) => void;
  isSelected?: boolean;
  scrollIntoView?: boolean;
}

export function Option({ title, value, onSelect, isSelected, scrollIntoView }: OptionProps) {
  const liRef = useRef<HTMLLIElement>(null);

  function handleClickGetData(event: MouseEvent<HTMLLIElement>) {
    const optionValue = event.currentTarget.getAttribute("data-value");
    const optionTitle = event.currentTarget.textContent;
    if (optionValue && optionTitle) {
      onSelect(optionValue, optionTitle);
    }
  }

  useEffect(() => {
    if (isSelected && liRef.current && scrollIntoView) {
      liRef.current.scrollIntoView({ block: "nearest", inline: "start" });
    }
  }, [isSelected, liRef]);

  return (
    <li
      ref={liRef}
      className={`${
        isSelected && "text-orange-light bg-white"
      } hover:text-white hover:bg-orange-light cursor-pointer h-50 flex items-center p-3.5 text-sm`}
      onMouseDown={handleClickGetData}
      data-value={value}
    >
      {title}
    </li>
  );
}

export type OptionType = {
  title: string;
  value: string | number | boolean;
};

interface SelectProps {
  placeholder?: string;
  options?: OptionType[];
  onChange?: (value: string | null, title: string) => void;
  defaultValue?: string | number | boolean | null;
  className?: string;
  disable?: boolean;
  position?: "top" | "bottom";
  selectClassName?: string;
  error?: string | number | boolean | null;
  label?: string;
  required?: boolean;
  scrollIntoView?: boolean;
}

export function Select({
  placeholder,
  options,
  className,
  onChange,
  defaultValue,
  disable,
  position = "bottom",
  error,
  label,
  required,
  scrollIntoView,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string | null>("");
  const [value, setValue] = useState(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectClassName = clsx(className && className);
  const optionClassName = clsx(
    "options bg-white absolute right-0 left-0 z-10 p-0",
    position === "top" && "options-top",
  );

  useEffect(() => {
    function handleClickCloseSelect(event: Event) {
      if (selectRef.current && !selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickCloseSelect);

    // Clean up
    return () => document.removeEventListener("mousedown", handleClickCloseSelect);
  }, [selectRef]);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options?.find((option) => option.value === defaultValue);
      const defaultOptionTitle = options?.find((option) => option.title === defaultValue);
      if (defaultOption) {
        setDisplayText(defaultOption.title);
        setValue(defaultOption.value);
      } else if (defaultOptionTitle) {
        setDisplayText(defaultOptionTitle.title);
        setValue(defaultOptionTitle.value);
      }
    } else {
      setValue("");
      setDisplayText("");
    }
  }, [defaultValue, options]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disable) {
      return;
    }
    setIsOpen(!isOpen);
  }
  function handleClickSelectOption(value: string | null, title: string) {
    value && setValue(value);
    setDisplayText(title);
    onChange && onChange(value, title);
    setIsOpen(!isOpen);
  }

  return (
    <div className="w-full">
      {label && (
        <Label className="pb-5" required={required}>
          {label}
        </Label>
      )}
      <div className={clsx(selectClassName, "relative text-sm")}>
        <div
          className={`select w-full flex items-center justify-between mb-1 ${
            disable ? "bg-graySearch-light pointer-events-none" : "bg-white"
          } ${error && "ring-1 ring-red-light"}`}
          role="button"
          onClick={handleClickOpenSelect}
          ref={selectRef}
          {...props}
        >
          <p
            className={clsx(
              !displayText && "text-gray-primary",
              "text-sm max-h-12 overflow-y-auto no-scrollbar",
            )}
          >
            {displayText || placeholder}
          </p>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
        {isOpen && (
          <ul className={optionClassName}>
            {options?.map((option) => (
              <Option
                key={option.title}
                title={option.title}
                value={option.value}
                onSelect={handleClickSelectOption}
                isSelected={value === option.value}
                scrollIntoView={scrollIntoView}
              />
            ))}
          </ul>
        )}
        {error && <p className="text-sm text-red-light">{error}</p>}
      </div>
    </div>
  );
}
