import { MouseEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { ChevronDown, ChevronUp } from "../icons";
import { Option } from "./option";
import "./styles.css";

type OptionType = {
  title: string;
  value: string | number | boolean;
};

interface SelectProps {
  placeholder?: string;
  options?: OptionType[];
  onChange?: (values: OptionType[]) => void;
  selectedValues?: Array<string | number | boolean>;
  className?: string;
  disable?: boolean;
  position?: "top" | "bottom";
  selectClassName?: string;
  error?: string | number | boolean | null;
}

export function MultipleSelect({
  placeholder,
  options,
  className,
  onChange,
  selectedValues,
  disable,
  position = "bottom",
  error,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string | null>("");
  const [values, setValues] = useState<Array<string | number | boolean>>([]);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const selectClassName = clsx(className && className);
  const optionClassName = clsx(
    "options bg-white absolute right-0 left-0 z-10 p-0",
    position === "top" && "options-top",
  );

  useEffect(() => {
    function handleClickCloseSelect(event: Event) {
      if (
        selectRef.current &&
        !selectRef.current?.contains(event.target as Node) &&
        !optionsRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickCloseSelect);

    // Clean up
    return () => document.removeEventListener("mousedown", handleClickCloseSelect);
  }, [selectRef]);

  useEffect(() => {
    if (JSON.stringify(selectedValues) === JSON.stringify(values)) {
      return;
    }
    if (selectedValues && selectedValues?.length > 0) {
      const optionsSelected = options?.filter(({ value }) => selectedValues.includes(value)) || [];
      const displayText = optionsSelected?.map(({ title }) => title).join(",");
      const values = optionsSelected?.map(({ value }) => value);
      setDisplayText(displayText);
      setValues(values);
    } else {
      setDisplayText("");
      setValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues, options]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disable) {
      return;
    }
    setIsOpen(!isOpen);
  }
  function handleClickSelectOption(value: string | number | boolean | null) {
    if (value === null) {
      return;
    }
    const isSelected = values.includes(value);
    const newValues = isSelected ? values.filter((item) => item !== value) : [...values, value];
    const optionsSelected = options?.filter(({ value }) => newValues.includes(value)) || [];
    const displayText = optionsSelected?.map(({ title }) => title).join(",");
    setValues(newValues);
    setDisplayText(displayText);
    onChange && onChange(optionsSelected);
  }
  return (
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
        <p className={clsx(!displayText && "text-gray-primary", "text-sm truncate w-56")}>
          {displayText || placeholder}
        </p>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <ul className={optionClassName} ref={optionsRef}>
          {options?.map((option) => (
            <Option
              key={option.title}
              title={option.title}
              value={option.value}
              onSelect={handleClickSelectOption}
              isSelected={values?.includes(option.value)}
            />
          ))}
        </ul>
      )}
      {error && <p className="text-sm text-red-light mb-1">{error}</p>}
    </div>
  );
}
