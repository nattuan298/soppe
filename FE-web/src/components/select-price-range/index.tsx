/* eslint-disable indent */
import { ReactNode, useEffect } from "react";
// import useTranslation from "next-translate/useTranslation";
// import { notifyToast } from "src/constants/toast";
import NumberFormat from "react-number-format";
import RangeSlider from "./Slider";
interface SelectProps {
  className?: string;
  children?: ReactNode;
  min: number;
  max: number;
  range: { start: number; end: number };
  setRange: Function;
  handleChangePrice?: Function;
  setLastInput?: (input: string) => void;
}

interface FormatNumberProps {
  value: number;
}

export const FormatNumber = ({ value }: FormatNumberProps) => {
  return (
    <NumberFormat
      thousandsGroupStyle="thousand"
      value={value}
      decimalSeparator="."
      displayType="text"
      type="text"
      thousandSeparator
      isNumericString
    />
  );
};

export function SelectPriceRange({
  min,
  max,
  range,
  setRange,
  handleChangePrice,
  setLastInput,
}: SelectProps) {
  // const { t } = useTranslation();

  useEffect(() => {
    // if (range.end > max) {
    //   notifyToast("error", "Price can't be higher than 100,000", t);
    // }
    handleChangePrice?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  return (
    <RangeSlider
      range={range}
      setRange={setRange}
      min={min}
      max={max}
      handleChangePrice={handleChangePrice}
      setLastInput={setLastInput}
    />
  );
}
