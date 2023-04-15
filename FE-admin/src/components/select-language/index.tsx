import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { textChangeLanguage } from "src/lib/format";

import { CitizenCodeType, ListCountryLanguage } from "src/constants/country_phone_code";
import { ChevronDown, ChevronUp } from "../icons";
import "./styles.css";
import { useTranslation } from "react-i18next";

interface OptionProps {
  onSelect: (value: CitizenCodeType) => void;
  isSeleted: boolean;
}

function Option({ onSelect, isSeleted, ...item }: OptionProps & CitizenCodeType) {
  const { t } = useTranslation("common");

  function handleClickGetData() {
    onSelect(item);
  }
  return (
    <li
      className={`${
        isSeleted && "text-orange-light"
      } hover:text-white hover:bg-orange-light cursor-pointer h-50 flex items-center p-3.5`}
      onMouseDown={handleClickGetData}
    >
      <img src={item.flag} alt="img" className="mr-2 w-5 h-5" />
      {t(textChangeLanguage(item.name).toLocaleLowerCase() as "to_ship")}
    </li>
  );
}

interface SelectProps {
  country?: string;
  onSelect?: (country: string) => void;
  disabled?: boolean;
  className?: string;
  setCountry?: Function;
  CanSwitch?: boolean;
}

export function SelectLanguage({
  country,
  onSelect,
  disabled,
  className,
  setCountry,
  CanSwitch,
}: SelectProps) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const url = new URL(window.location.href);
  const link = url.searchParams.get("languageContent");
  const [value, setValue] = useState<CitizenCodeType>(
    ListCountryLanguage.find((item) => item.value === country) || {
      name: "Thai Content",
      code: "66",
      flag: "/assets/images/country/thailand.svg",
      value: "Thai",
    },
  );
  const selectClassName = clsx(className && className);
  useEffect(() => {
    setValue(
      ListCountryLanguage.find((item) => item.value === country) || {
        name: "English Content",
        code: "84",
        flag: "/assets/images/country/united-states.svg",
        value: "English",
      },
    );
  }, []);
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

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    CanSwitch &&
      setValue(
        ListCountryLanguage.find((item) => item.value === link) || {
          name: "English Content",
          code: "84",
          flag: "/assets/images/country/united-states.svg",
          value: "English",
        },
      );
  }, [CanSwitch]);
  function handleClickSelectOption(item: CitizenCodeType) {
    if (CanSwitch) {
      item && setValue(item);
    }
    setIsOpen(!isOpen);
    onSelect?.(item.value);
    setCountry?.(item.value);
  }

  return (
    <div className={clsx(selectClassName, "country-select relative h-50 select-custom")}>
      <div
        className={`select flex items-center justify-between pr-2 pl-3 w-full ${
          disabled ? "bg-graySearch-light cursor-default" : "bg-white"
        }`}
        role="button"
        onClick={handleClickOpenSelect}
        ref={selectRef}
      >
        <div className="flex items-center">
          <img src={value.flag} alt="img" className="mr-2 w-5 h-5" />
          <span className="text-sm">
            {t(textChangeLanguage(value.name).toLocaleLowerCase() as "to_ship")}
          </span>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <ul
        className={clsx(
          "options bg-white absolute right-0 left-0 top-14 z-10 p-0",
          isOpen ? "block" : "hidden",
        )}
      >
        {ListCountryLanguage.map((option) => (
          <Option
            key={option.value}
            onSelect={handleClickSelectOption}
            isSeleted={value.value === option.value}
            {...option}
          />
        ))}
      </ul>
    </div>
  );
}
