/* eslint-disable indent */
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { withValueCap } from "src/lib/common.lib";
import "./styles.css";

interface RangeSliderType {
  range: { start: number; end: number };
  setRange: Function;
  min: number;
  max: number;
  handleChangePrice: Function;
}

const useStyle = makeStyles({
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "3px solid #FF7500",
    marginTop: -8,
    transform: "translateX(-9px)",
    '&[data-index="0"]': {
      transform: "translateX(6px)",
    },
  },
});

export default function RangeSlider({
  range,
  setRange,
  min,
  max,
  handleChangePrice,
}: RangeSliderType) {
  const { t } = useTranslation("common");
  const classes = useStyle();
  const [start, setStart] = useState<number | undefined>(range.start);
  const [end, setEnd] = useState<number | undefined>(range.end);

  useEffect(() => {
    setStart(range.start);
  }, [range.start]);
  useEffect(() => {
    setEnd(range.end);
  }, [range.end]);

  const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRange({ start: newValue[0], end: newValue[1] });
    }
  };

  const handleOnChange = (name: string) => (e: NumberFormatValues) => {
    name === "start" && setStart(e.floatValue);
    name === "end" && setEnd(e.floatValue);

    if (e.floatValue) {
      setRange((preState: { start: number; end: number }) => ({
        ...preState,
        [name]: e.floatValue,
      }));
    }
  };

  const onBlur = () => {
    if (range.end > max) {
      setRange({ start: range.start, end: max });
    }
    if (range.start > range.end) {
      setRange({ start: range.end, end: range.start });
    }
  };

  return (
    <div className="range-slider">
      <Slider
        value={[range.start, range.end]}
        onChange={handleChange}
        min={min}
        max={max}
        step={1}
        classes={classes}
      />
      <div className="flex justify-between items-center mt-4">
        <NumberFormat
          className="input outline-none pl-3.5 float-left"
          value={start}
          onValueChange={handleOnChange("start")}
          allowNegative={false}
          thousandSeparator
          isNumericString
          isAllowed={withValueCap({ max })}
          onBlur={onBlur}
        />
        <label>
          <span>{t`to`}</span>
        </label>
        <NumberFormat
          className="input outline-none pl-3.5 float-right"
          onValueChange={handleOnChange("end")}
          value={end}
          allowNegative={false}
          thousandSeparator
          // isAllowed={withValueCap({ max: 1000000 })}
          isNumericString
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
