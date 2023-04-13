import { MouseEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "../icons";
import "./styles.css";
import { Label } from "../input";

interface OptionProps {
  title: string;
  value: string | number | boolean;
  onSelect: () => void;
  isSelected?: boolean;
}

export function Option({ title, value, onSelect, isSelected }: OptionProps) {
  return (
    <li
      className={`${
        isSelected && "text-orange-light bg-white"
      } hover:text-white hover:bg-orange-light cursor-pointer h-50 flex items-center p-3.5 text-sm`}
      onMouseDown={onSelect}
      data-value={value}
    >
      {title}
    </li>
  );
}

export type OptionType = {
  name: string;
  _id: string;
  nameEng: string;
};

interface SelectProps {
  placeholder?: string;
  options?: OptionType[];
  onChange?: (value: string, title: string) => void;
  defaultValue?: string | number | boolean | null;
  className?: string;
  disable?: boolean;
  position?: "top" | "bottom";
  selectClassName?: string;
  error?: string | number | boolean | null;
  label?: string;
  required?: boolean;
  trans?: (text: string) => string;
  country?: string;
}

export function SelectAddress({
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
  trans,
  country,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string | null>("");
  const [value, setValue] = useState<OptionType>(
    options?.find((option) => option.nameEng === defaultValue) || {
      nameEng: "",
      _id: "",
      name: "",
    },
  );

  const selectRef = useRef<HTMLDivElement>(null);
  const selectClassName = clsx(className && className);
  const optionClassName = clsx(
    "options bg-white absolute right-0 left-0 z-10 p-0",
    position === "top" && "options-top",
  );
  const lang = localStorage.getItem("i18nextLng");
  const checkLang = lang === "th" && country === "Thailand";

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
      const defaultOption = options?.find((option) => option.nameEng === defaultValue);
      const defaultOptionTitle = options?.find((option) => option.nameEng === defaultValue);

      if (defaultOption?._id) {
        const _id = defaultOption?._id;
        const nameEng = defaultOption?.nameEng;

        if (checkLang) {
          setDisplayText(defaultOption.name);
        } else {
          setDisplayText(defaultOption.nameEng);
        }
        setValue({ nameEng, _id, name: "" });
      } else if (defaultOptionTitle) {
        const _id = defaultOptionTitle?._id;
        const nameEng = defaultOptionTitle?.nameEng;
        if (checkLang) {
          setDisplayText(defaultOptionTitle.name);
        } else {
          setDisplayText(defaultOptionTitle.nameEng);
        }
        setValue({ _id, nameEng, name: "" });
      }
    } else {
      setValue({ nameEng: "", _id: "", name: "" });
      setDisplayText("");
    }
  }, [checkLang, country, defaultValue, lang, options]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disable) {
      return;
    }
    setIsOpen(!isOpen);
  }
  const handleClickSelectOption = (option: OptionType) => () => {
    option && setValue(option);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!isOpen && value.nameEng !== defaultValue) {
      onChange?.(value._id, value.nameEng);
    }
  }, [isOpen, value]);
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
                key={option._id}
                title={checkLang ? option.name : option.nameEng}
                value={checkLang ? option.name : option.nameEng}
                onSelect={handleClickSelectOption(option)}
                isSelected={value._id === option._id}
              />
            ))}
          </ul>
        )}
        {error && <p className="text-sm text-red-light">{trans ? trans(`${error}`) : error}</p>}
      </div>
    </div>
  );
}
