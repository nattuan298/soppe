/* eslint-disable indent */
import { ClickAwayListener } from "@material-ui/core";
import clsx from "clsx";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";
import { formatNumber } from "src/lib/common.lib";
import { FormatNumber } from "src/lib/format-number";
import { ChevronDown, ChevronUp } from "../icons";
import RangeSlider from "./Slider";
import "./styles.css";

interface SelectProps {
  className?: string;
  children?: ReactNode;
  min: number;
  max: number;
  range: { start: number; end: number };
  setRange: Function;
  handleChangePrice: Function;
  showAllLabel?: boolean;
  couponHistory?: boolean;
}

export function SelectPriceRange({
  className,
  min,
  max,
  range,
  setRange,
  handleChangePrice,
  showAllLabel,
  couponHistory,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectClassName = clsx(className && className);
  const { t } = useTranslation("common");

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }

  const onClickAway = () => {
    if (isOpen) {
      setIsOpen(false);
      if (range.end > max) {
        setRange({ start: range.start, end: max });
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (range.start > range.end) {
        setRange({ start: range.end, end: range.start });
      }

      if (range.end > max) {
        notifyToast("error", "", () =>
          t("price-cannot-higher-than", { maximum: formatNumber(max) }),
        );
      }
      handleChangePrice();
    }
  }, [isOpen, range.start, range.end]);

  function getDisplayedPriceRange(start: number, end: number) {
    if (start === 0 && end === 0 && showAllLabel) {
      return <p className="capitalize text-gray-primary">{t("all")}</p>;
    }
    return (
      <p>
        <FormatNumber value={range.start} /> - <FormatNumber value={range.end} />
      </p>
    );
  }
  return (
    <ClickAwayListener onClickAway={onClickAway} mouseEvent="onMouseDown">
      <div className={clsx(selectClassName, "relative")}>
        <div
          className={`select flex items-center justify-between mb-1 bg-white ${
            couponHistory ? "w-[288px] 2xl:w-[343px]" : ""
          }`}
          role="button"
          onClick={handleClickOpenSelect}
          ref={selectRef}
        >
          <p>{getDisplayedPriceRange(range.start, range.end)}</p>

          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
        {isOpen && (
          <ul className="bg-white absolute right-0 left-0 z-10 p-0">
            <RangeSlider
              range={range}
              setRange={setRange}
              min={min}
              max={max}
              handleChangePrice={handleChangePrice}
            />
          </ul>
        )}
      </div>
    </ClickAwayListener>
  );
}
