import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import InputOnlyNumber from "src/components/input/only-number";
import {
  CountryPhoneCodeDefault,
  CountryPhoneCodeType,
  ListCountryPhoneCode,
} from "src/constants/country_phone_code";
import { ChevronDown, ChevronUp } from "../svgs";
import Option from "./option";
import styles from "./styles.module.css";
interface SelectProps {
  isSlectCountry?: boolean;
  handleChangePhoneCode?: (val: string) => void;
  handleChangePhoneNumber?: (e: ChangeEvent<HTMLInputElement>) => void;
  phoneCode?: string;
  phoneNumber?: string;
  placeholderInput?: string;
  phoneNumberError?: string | boolean;
  disabled?: boolean;
  disabledPhoneCode?: boolean;
  noChangePhoneCode?: boolean;
  trans?: boolean;
}

export default function SelectPhoneCode({
  phoneCode,
  isSlectCountry,
  phoneNumber,
  handleChangePhoneNumber,
  handleChangePhoneCode,
  placeholderInput,
  phoneNumberError,
  disabled,
  disabledPhoneCode,
  noChangePhoneCode,
  trans,
}: SelectProps) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState<CountryPhoneCodeType>(
    ListCountryPhoneCode.find((item) => item.code === phoneCode) || CountryPhoneCodeDefault,
  );
  useEffect(() => {
    setValue(
      ListCountryPhoneCode.find((item) => item.code === phoneCode) || CountryPhoneCodeDefault,
    );
  }, [phoneCode]);
  useEffect(() => {
    if (isOpen) {
      ulRef.current?.scrollTo(0, 100);
    }
    ulRef.current?.scrollTo({ behavior: "smooth", top: liRef.current?.offsetTop });
  }, [isOpen, value]);

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
      }
    },
    [value.code],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyPress);
    }
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, onKeyPress]);

  useEffect(() => {
    if (!isOpen && !noChangePhoneCode) {
      handleChangePhoneCode?.(value.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, value]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    if (disabledPhoneCodeMerge) {
      return;
    }
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  const handleClickSelectOption = (item: CountryPhoneCodeType) => () => {
    if (noChangePhoneCode) {
      handleChangePhoneCode?.(item.code);
    } else {
      setValue(item);
    }
    // !noChangePhoneCode && setValue(item);
    setIsOpen(!isOpen);
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (newVal.length > 15) {
      return;
    }
    handleChangePhoneNumber?.(e);
  };

  const disabledPhoneCodeMerge = disabled || disabledPhoneCode;

  return (
    <div className="relative flex">
      <div className={`h-50 select-custom ${isSlectCountry && "w-full"}`}>
        <div
          className={`${styles.select} flex items-center justify-between pr-2 pl-3 ${
            isSlectCountry ? "w-full" : "w-24 bg-lighterGray"
          }`}
          role={!disabledPhoneCodeMerge ? "button" : undefined}
          onClick={handleClickOpenSelect}
          ref={selectRef}
        >
          <div className="flex items-center">
            <img src={value.flag} alt="img" className="mr-2 w-5 h-5" />

            <span className="text-sm">{isSlectCountry ? value.name : `+${value.code}`}</span>
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
              isSeleted={value.code === option.code}
              name={option.name + (!isSlectCountry && ` +${option.code}`)}
              ref={liRef}
              image={option.flag}
            />
          ))}
        </ul>
      </div>
      <div className="ml-4 w-full">
        <InputOnlyNumber
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          placeholder={placeholderInput}
          fullWidth
          error={!!phoneNumberError}
          helperText={phoneNumberError}
          disabled={disabled}
          t={trans ? t : undefined}
        />
      </div>
    </div>
  );
}
