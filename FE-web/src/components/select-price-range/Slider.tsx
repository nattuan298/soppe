/* eslint-disable indent */
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import classnames from "classnames";
import cls from "./style.module.css";
// import { notifyToast } from "src/constants/toast";

interface RangeSliderType {
  range: { start: number; end: number };
  setRange: Function;
  min: number;
  max: number;
  handleChangePrice?: Function;
  setLastInput?: (input: string) => void;
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
  range = { start: 0, end: 100000 },
  setRange,
  min,
  max,
  setLastInput,
}: RangeSliderType) {
  const { t } = useTranslation("common");
  const classes = useStyle();
  const [start, setStart] = useState<number | undefined>(range.start);
  const [end, setEnd] = useState<number | undefined>(range.end);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const rangerRef = useRef(null);

  useEffect(() => {
    if (!focusInput) {
      setStart(range.start);
    }
  }, [range.start, focusInput]);

  useEffect(() => {
    if (!focusInput) {
      setEnd(range.end);
    }
  }, [range.end, focusInput]);

  const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    // if (!rangerRef.current) {
    //   return;
    // }
    // try {
    //   const target = rangerRef.current as HTMLDivElement;
    //   const [startEl, endEl] = target.getElementsByClassName("MuiSlider-thumb") || [null, null];
    //   const startLeft = getComputedStyle(startEl);
    //   const endLeft = getComputedStyle(endEl);
    //   const sleftValue = Number(startLeft.left.replace("px", ""));
    //   const eLeftValue = Number(endLeft.left.replace("px", ""));
    //   if (Array.isArray(newValue) && sleftValue <= eLeftValue) {
    //     setRange({ start: newValue[0], end: newValue[1] });
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (e: any) {
    //   if (Array.isArray(newValue)) {
    //     setRange({ start: newValue[0], end: newValue[1] });
    //   }
    // }
    if (Array.isArray(newValue)) {
      setRange({ start: newValue[0], end: newValue[1] });
    }
  };

  const handleOnChange = (name: string) => (e: NumberFormatValues) => {
    name === "start" && setStart(e.floatValue);
    name === "end" && setEnd(e.floatValue);
    setLastInput?.(name);
    if (e.floatValue && focusInput) {
      setRange((preState: { start: number; end: number }) => ({
        ...preState,
        [name]: e.floatValue,
      }));
    }
  };

  const withValueCap =
    ({ max }: { max: number }) =>
    (inputObj: NumberFormatValues) => {
      const { floatValue } = inputObj;
      if (!floatValue || floatValue <= max) return true;
      return false;
    };

  const onBlur = () => {
    setFocusInput(false);
    const validStart = start || 0;
    const validEnd = end || 100000;
    if (validStart !== start || validEnd !== end) {
      setRange({ start: validStart, end: validEnd });
    }
    // if (range.end > 100000) {
    //   setRange({ start: range.start, end: 100000 });
    // }
  };

  return (
    <div className={cls.rangeSlider} ref={rangerRef}>
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
          className={classnames(cls.Input, "outline-none pl-2 float-left text-sm")}
          value={start}
          onValueChange={handleOnChange("start")}
          allowNegative={false}
          thousandSeparator
          isNumericString
          isAllowed={withValueCap({ max: 100000 })}
          onBlur={onBlur}
          onFocus={() => setFocusInput(true)}
        />
        <label className="text-sm mx-2">
          <span>{t`to`}</span>
        </label>
        <NumberFormat
          className={classnames(cls.Input, "outline-none pl-2 float-right text-sm")}
          onValueChange={handleOnChange("end")}
          value={end}
          allowNegative={false}
          thousandSeparator
          // isAllowed={withValueCap({ max: 1000000 })}
          isNumericString
          onBlur={onBlur}
          onFocus={() => setFocusInput(true)}
        />
      </div>
    </div>
  );
}
