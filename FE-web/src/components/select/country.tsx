import useTranslation from "next-translate/useTranslation";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  CountryPhoneCodeDefault,
  CountryPhoneCodeType,
  ListCountryPhoneCode,
} from "src/constants/country_phone_code";
import { ChevronDown, ChevronUp } from "../svgs";
import Option from "./option";
import styles from "./styles.module.css";

interface SelectProps {
  country?: string;
  disabled?: boolean;
  onSelect?: (val: CountryPhoneCodeType) => void;
  selectCitizenship?: boolean;
  classNameTextField?: string;
}

export default function SelectCountry({
  country,
  onSelect,
  disabled,
  selectCitizenship,
  classNameTextField,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const { t } = useTranslation("common");
  const [value, setValue] = useState<CountryPhoneCodeType>(CountryPhoneCodeDefault);

  useEffect(() => {
    if (!isOpen && value.value !== country) {
      const newValue = ListCountryPhoneCode.find((item) =>
        selectCitizenship ? item.citizenship === country : item.value === country,
      );
      newValue && setValue(newValue);
    }
  }, [country, value.value, isOpen, selectCitizenship]);

  useEffect(() => {
    if (isOpen) {
      ulRef.current?.scrollTo({ behavior: "smooth", top: liRef.current?.offsetTop });
    }
  }, [isOpen, value]);

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

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        let index: number = ListCountryPhoneCode.findIndex((ele) => {
          return ele.code === value.code;
        });

        const arrLength = ListCountryPhoneCode.length;
        if (event.key === "ArrowDown") {
          index = index < arrLength - 1 ? index + 1 : 0;
        }
        if (event.key === "ArrowUp") {
          index = index > 0 ? index - 1 : arrLength - 1;
        }

        setValue(ListCountryPhoneCode[index]);
      }
      if (["Enter", "Escape"].includes(event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsOpen(false);
        onSelect?.(value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value.code],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyPress);
    }
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, onKeyPress]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  const handleClickSelectOption = (item: CountryPhoneCodeType) => () => {
    setValue(item);
    setIsOpen(!isOpen);
    onSelect?.(item);
  };

  return (
    <div className="relative h-50 select-custom">
      <div
        className={`${styles.select} flex items-center justify-between pr-2 pl-3 w-full ${
          disabled && "bg-lighterGray"
        }  ${isOpen && "border-orange"}`}
        role={!disabled ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
      >
        <div className="flex items-center">
          <img src={value.flag} alt="img" className="mr-2 w-[17px] sm:w-5 h-[17px] sm:h-5" />
          <span className={`${classNameTextField} sm:text-sm`}>
            {selectCitizenship ? t(value.citizenship) : t(value.name)}
          </span>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <ul
        className={`${styles.options} bg-white absolute right-0 left-0 top-14 z-10 ${
          isOpen ? "block" : "hidden"
        }`}
        ref={ulRef}
      >
        {ListCountryPhoneCode.map((option) => (
          <Option
            key={option.value}
            onSelect={handleClickSelectOption(option)}
            isSeleted={value.value === option.value}
            ref={liRef}
            name={selectCitizenship ? t(option.citizenship) : t(option.name)}
            image={option.flag}
          />
        ))}
      </ul>
    </div>
  );
}
