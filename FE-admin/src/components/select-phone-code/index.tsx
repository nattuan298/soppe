import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { InputBaseProps } from "@material-ui/core/InputBase";
import clsx from "clsx";

import { CountryPhoneCodeType, ListCountryPhoneCode } from "src/constants/country_phone_code";
import { InputOnlyNumber } from "../input";
import "./styles.css";
import { ChevronDown, ChevronUp } from "../icons";
import { useStyles } from "./styles";

interface OptionProps {
  onSelect: (value: CountryPhoneCodeType) => void;
  isSeleted: boolean;
  isSlectCountry?: boolean;
  disabled?: boolean;
}

function Option({
  onSelect,
  isSeleted,
  isSlectCountry,
  ...item
}: OptionProps & CountryPhoneCodeType) {
  function handleClickGetData() {
    onSelect(item);
  }

  return (
    <li
      className={`${
        isSeleted && "text-orange-light"
      }  hover:text-white hover:bg-orange-light h-50 flex items-center p-3.5 cursor-pointer`}
      onMouseDown={handleClickGetData}
    >
      <img src={item.flag} alt="img" className="mr-2 w-5 h-5" />
      {item.name + (!isSlectCountry && ` +${item.code}`)}
    </li>
  );
}

interface SelectProps extends InputBaseProps {
  isSlectCountry?: boolean;
  onChangePhoneCode?: (val: string) => void;
  onChangePhoneNumber?: (e: ChangeEvent<HTMLInputElement>) => void;
  phoneCode?: string;
  phoneNumber?: string;
  placeholderInput?: string;
  errorMessage?: string;
  disabledPhoneCode?: boolean;
  disabledPhoneNumber?: boolean;
}

export function SelectPhoneCode({
  phoneCode,
  isSlectCountry,
  phoneNumber,
  onChangePhoneNumber,
  onChangePhoneCode,
  placeholderInput,
  errorMessage,
  disabled,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<CountryPhoneCodeType>({
    name: "Thailand",
    code: "66",
    flag: "/assets/images/country/thailand.svg",
    value: "tha",
  });
  const { error } = useStyles();

  useEffect(() => {
    setValue(
      ListCountryPhoneCode.find((item) => item.code === phoneCode) || {
        name: "Thailand",
        code: "66",
        flag: "/assets/images/country/thailand.svg",
        value: "tha",
      },
    );
  }, [phoneCode]);
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
  function handleClickSelectOption(item: CountryPhoneCodeType) {
    // setDisplayText(``);
    onChangePhoneCode?.(item.code);
    setValue(item);
    setIsOpen(!isOpen);
  }
  function handleChangePhoneNumber(event: ChangeEvent<HTMLInputElement>) {
    onChangePhoneNumber?.(event);
  }

  return (
    <>
      <div className="relative flex items-center phone-country-select">
        <div className={clsx("h-50 select-custom", isSlectCountry && "w-full")}>
          <div
            className={clsx(
              "select flex items-center justify-between pr-2 pl-3 relative",
              isSlectCountry ? "w-full" : "w-24 bg-lighterGray",
              disabled && "bg-graySearch-light",
              disabled && "cursor-default",
            )}
            role="button"
            onClick={handleClickOpenSelect}
            ref={selectRef}
          >
            <div className="flex items-center">
              <img src={value.flag} alt="img" className="mr-2 w-5 h-5" />
              <span className="text-sm">{isSlectCountry ? value.name : `+${value.code}`}</span>
            </div>
            <div className="absolute right-1">{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
          </div>
          <ul
            className={clsx(
              "options bg-white absolute right-0 left-0 top-14 z-10 p-0",
              isOpen ? "block" : "hidden",
            )}
          >
            {ListCountryPhoneCode.map((option) => (
              <Option
                key={option.value}
                onSelect={handleClickSelectOption}
                isSeleted={value.code === option.code}
                isSlectCountry={isSlectCountry}
                {...option}
              />
            ))}
          </ul>
        </div>
        {!isSlectCountry && (
          <InputOnlyNumber
            fullWidth
            disabled={disabled}
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            placeholder={placeholderInput}
            className={clsx("ml-4", errorMessage && error)}
            inputProps={{
              maxLength: 15,
            }}
            {...props}
          />
        )}
      </div>
      <p className="text-sm">{errorMessage}</p>
    </>
  );
}
