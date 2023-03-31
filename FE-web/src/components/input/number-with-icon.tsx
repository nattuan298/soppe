/* eslint-disable indent */
import { OutlinedInput } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import styles from "./input.module.css";
import NumberFormatCustome from "../text/number-format";

interface NumberWithIconType {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  inputClassName?: string;
  stillShowColorTextInput?: boolean;
  showMaxValue?: boolean;
  formatToNumber?: (val: string) => string;
  widthInput?: boolean;
}

const useStyle = makeStyles({
  disabled: {
    color: "#231F20 !important",
    fontWeight: 500,
    "& .MuiInputBase-input.Mui-disabled": {
      color: "#C0C0C0",
    },
  },
});

export default function NumberWithIcon({
  value = 0,
  onChange,
  min = 1,
  max = 10000,
  disabled,
  inputClassName,
  stillShowColorTextInput,
  showMaxValue,
  formatToNumber,
  widthInput,
}: NumberWithIconType) {
  const [number, setNumber] = useState<number | undefined>(value);
  const classes = useStyle();

  useEffect(() => {
    setNumber(value);
  }, [value]);

  const handleChange = (e: NumberFormatValues) => {
    const newVal = e.floatValue;
    if (newVal) {
      if (newVal > max) {
        onChange?.(max);
        return setNumber(max);
      }

      onChange?.(newVal);
      return setNumber(newVal);
    }
    setNumber(newVal);
  };

  const disabledRemoveButton = disabled || number === min;
  const disabledAddButton = disabled || number === max;

  const onDecrease = () => {
    if (disabledRemoveButton) {
      return;
    }
    setNumber((preNumber) => {
      if (!preNumber) {
        return 1;
      }
      return preNumber > min ? preNumber - 1 : preNumber;
    });
  };

  const onIncrease = () => {
    if (disabledAddButton) {
      return;
    }
    setNumber((preNumber) => {
      if (!preNumber) {
        return 1;
      }
      return preNumber + 1;
    });
  };

  const onBlur = () => {
    if (!number) {
      setNumber(1);
      onChange?.(1);
    }
  };

  const withValueCap = (inputObj: NumberFormatValues) => {
    const { floatValue } = inputObj;
    if (floatValue === undefined) {
      return true;
    }

    if (floatValue === 0) {
      return false;
    }

    if ((number === max && floatValue > max) || floatValue < min) {
      return false;
    }
    return true;
  };

  return (
    <div className={`relative ${widthInput ? "w-auto sm:max-w-[125px]" : "max-w-[125px]"}`}>
      <NumberFormat
        className={`${styles.inputNumberFormat} ${inputClassName} w-full sm:w-[125px]`}
        value={number}
        onValueChange={handleChange}
        allowNegative={false}
        thousandSeparator
        isNumericString
        disabled={disabled}
        customInput={OutlinedInput}
        inputProps={{
          style: showMaxValue
            ? {
                textAlign: "right",
                paddingRight: "50%",
              }
            : {
                textAlign: "center",
              },
          className: styles.inputNumberFormat,
        }}
        format={formatToNumber}
        onBlur={onBlur}
        isAllowed={withValueCap}
        classes={stillShowColorTextInput ? classes : {}}
        decimalScale={0}
      />
      <span
        role={!disabledRemoveButton ? "button" : undefined}
        className={`absolute top-0 left-1 h-full w-8 flex justify-center items-center text-1.5xl ${
          disabledRemoveButton ? "text-lighterGray" : ""
        }`}
        onClick={onDecrease}
      >
        -
      </span>
      {showMaxValue && (
        <div className="absolute top-0 pt-1 left-1/2 h-full flex items-center font-light text-0.625">
          {"/"}
          <NumberFormatCustome value={max} />
        </div>
      )}
      <span
        role={!disabledAddButton ? "button" : undefined}
        className={`absolute top-0 right-0 h-full w-8 flex justify-center items-center text-1.5xl ${
          disabledAddButton ? "text-lighterGray" : ""
        }`}
        onClick={onIncrease}
      >
        +
      </span>
    </div>
  );
}
