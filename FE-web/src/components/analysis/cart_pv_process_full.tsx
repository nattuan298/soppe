import { LinearProgress, Tooltip, makeStyles } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useRef, useState } from "react";
import NumberFormatCustome from "../text/number-format";
import BigMedal from "./medal/bigMedal";
import SmallMedal from "./medal/smallMedal";
import styles from "./style.module.css";

// interface InforMoneyCardProps {
//   value: number | string;
//   unit: string;
//   icon: ReactElement;
// }

const useStyle = makeStyles({
  tooltip: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#FF7500",
  },
  arrow: {
    color: "#FF7500",
    marginBottom: "-6px !important",
  },
  popper: {
    zIndex: 20,
  },
});

export default function CartPvProcessFull({ value = 0, title }: { value: number; title: string }) {
  const classes = useStyle();
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(12);
  const [right, setRight] = useState(12);
  const medalInTheFirst = true;
  const { t } = useTranslation("common");

  useEffect(() => {
    const ele1 = ref1.current;
    if (ele1) {
      setLeft(ele1.offsetWidth / 2);
    }
  }, [ref1]);

  useEffect(() => {
    const ele = ref2.current;
    if (ele) {
      setRight(ele.offsetWidth / 2);
    }
  }, [ref2]);

  const valueLeft = useMemo(() => {
    if (value > 100) {
      return 100;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  }, [value]);

  return (
    <div
      className={`pr-3 pl-3 pt-2 pb-3 flex flex-col justify-between ${styles.card_container}`}
      style={{ height: 130 }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-0.625">{title}</p>
        <span className="font-medium text-xs">
          {t`you_need`}
          <NumberFormatCustome value="61000" className="text-orange ml-2 mr-2" />
          {t`more_pv_to_reach_the_next_level`}
        </span>
      </div>
      <div className="flex justify-between relative">
        <div
          className="absolute w-full"
          style={{ paddingLeft: left, paddingRight: right, top: 10 }}
        >
          <div className="relative">
            <LinearProgress variant="determinate" value={value} />

            <Tooltip
              title={
                <NumberFormatCustome value="39000" suffix=" PV" className="text-xs text-white" />
              }
              arrow
              open
              placement="top"
              classes={classes}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  top: -3,
                  left: `${valueLeft}%`,
                  transform: "translateX(-50%)",
                }}
                className="bg-orange rounded-full absolute"
              />
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-col items-center" ref={ref1}>
          <div className="w-6 h-6 flex justify-center items-center">
            {medalInTheFirst && <SmallMedal isFull className="w-5 h-5" medalSize="14" />}

            {!medalInTheFirst && (
              <div
                style={{
                  width: 10,
                  height: 10,
                }}
                className="bg-orange rounded-full"
              />
            )}
          </div>
          <p className="font-medium text-blue text-xs invisible" style={{ marginTop: 2 }}>
            No
          </p>
          <NumberFormatCustome
            value="0.00"
            suffix=" PV"
            className="text-blue font-medium text-xs"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex justify-center items-center">
            <SmallMedal isFull className="w-5 h-5" medalSize="14" />
          </div>
          <p className="font-medium text-blue text-xs" style={{ marginTop: 2 }}>
            Bronze
          </p>
          {/* <NumberFormatCustome value="30000" suffix=" PV" className="text-blue font-medium text-xs" /> */}
          <NumberFormatCustome
            value="10000"
            suffix=" PV"
            className="text-blue font-medium text-xs"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex justify-center items-center">
            <SmallMedal isFull className="w-5 h-5" medalSize="14" />
          </div>
          <p className="font-medium text-blue text-xs" style={{ marginTop: 2 }}>
            Silver
          </p>
          <NumberFormatCustome
            value="30000"
            suffix=" PV"
            className="text-blue font-medium text-xs"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex justify-center items-center">
            <SmallMedal isFull className="w-5 h-5" medalSize="14" />
          </div>
          <p className="font-medium text-blue text-xs" style={{ marginTop: 2 }}>
            Gold
          </p>
          <NumberFormatCustome
            value="60000"
            suffix=" PV"
            className="text-blue font-medium text-xs"
          />
        </div>
        <div className="flex flex-col items-center" ref={ref2}>
          <div className="w-6 h-6 flex justify-center items-center">
            <BigMedal />
          </div>
          <p className="font-medium text-blue text-xs" style={{ marginTop: 2 }}>
            Platinum
          </p>
          <NumberFormatCustome
            value="100000"
            suffix=" PV"
            className="text-blue font-medium text-xs"
          />
        </div>
      </div>
    </div>
  );
}
