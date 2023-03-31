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
    paddingTop: 1,
    paddingBottom: 1,
    backgroundColor: "#FF7500",
  },
  arrow: {
    color: "#FF7500",
    marginBottom: "-6px !important",
  },
  popper: {
    zIndex: 20,
    height: "2.9rem",
  },
  // tooltipPlacementTop: {
  //   top: "5px !important",
  // },
});

export default function CartPvProcess({
  value = "0",
  title,
  title1,
  title2,
  title3,
  value1,
  value2,
  value3,
  deductPv1,
  deductPv2,
}: {
  value: string;
  title: string;
  title1: string;
  title2: string;
  title3: string;
  value1: string;
  value2: string;
  value3: string;
  deductPv1: string;
  deductPv2: string;
}) {
  const classes = useStyle();
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(12);
  const [right, setRight] = useState(12);
  const medalInTheFirst = true;
  const { t } = useTranslation("common");

  const customeValue: { deductPvNumber: string; progress: number } = useMemo(() => {
    const deductPv1Number = parseFloat(deductPv1);
    const deductPv2Number = parseFloat(deductPv2);
    const value1Number = parseFloat(value1) || 0;
    const value2Number = parseFloat(value2);
    const value3Number = parseFloat(value3);
    let deductPvNumber = "0.00";
    let progress = 100;

    if (deductPv1Number <= 0) {
      deductPvNumber = (-deductPv1Number).toFixed(2);
      progress = (100 + (deductPv1Number / (value2Number - value1Number)) * 100) / 2;
    } else if (deductPv2Number <= 0) {
      deductPvNumber = Math.abs(deductPv2Number).toFixed(2);
      progress = (deductPv1Number / (value3Number - value2Number)) * 50 + 50;
    }

    if (deductPv1 === null && deductPv2 === null) {
      progress = 0;
    }

    return {
      deductPvNumber,
      progress,
    };
  }, [deductPv1, deductPv2, value1, value2, value3]);

  const progress = useMemo(() => {
    if (customeValue.progress > 100) {
      return 100;
    }
    if (customeValue.progress < 0) {
      return 0;
    }
    return customeValue.progress;
  }, [customeValue.progress]);

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

  return (
    <div
      className={`pr-3 pl-3 pt-2 pb-1 flex flex-col justify-between h-[100px] ${styles.card_container}`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-0.625">{title}</p>
        {customeValue.progress < 100 && (
          <span className="text-0.5">
            {t`you_need`}
            <NumberFormatCustome
              value={customeValue.deductPvNumber}
              className="text-orange ml-2 mr-2"
            />
            {t`more_pv_to_reach_the_next_level`}
          </span>
        )}
      </div>
      <div className="flex justify-between relative">
        <div
          className="absolute w-full"
          style={{ paddingLeft: left, paddingRight: right, top: 10 }}
        >
          <div className="relative">
            <LinearProgress variant="determinate" value={customeValue.progress} />
            <Tooltip
              title={
                <NumberFormatCustome
                  value={value || 0}
                  suffix=" PV"
                  className="text-0.625 text-white"
                />
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
                  left: `${progress}%`,
                  transform: "translateX(-50%)",
                }}
                className="bg-orange rounded-full absolute"
              />
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-col items-center" ref={ref1}>
          <div className="w-6 h-6 flex justify-center items-center">
            {medalInTheFirst && <SmallMedal isFull />}
            {!medalInTheFirst && <div className="bg-orange rounded-full h-2.5 w-2.5" />}
          </div>
          <p className="font-medium text-blue text-0.375 mt-0.5">{title1}</p>
          <NumberFormatCustome
            value={value1}
            suffix=" PV"
            className="text-blue text-0.5 font-medium"
          />
        </div>
        <div className="absolute w-full " style={{ paddingLeft: left, paddingRight: right }}>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 flex justify-center items-center">
              <SmallMedal isFull={customeValue.progress >= 50} />
            </div>
            <p className="font-medium text-blue text-0.375 mt-0.5">{title2}</p>
            <NumberFormatCustome
              value={value2}
              suffix=" PV"
              className="text-blue text-0.5 font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col items-center" ref={ref2}>
          <div className="w-6 h-6 flex justify-center items-center">
            <BigMedal isFull={customeValue.progress === 100} />
          </div>
          <p className="font-medium text-blue text-0.375 mt-0.5">{title3}</p>
          <NumberFormatCustome
            value={value3}
            suffix=" PV"
            className="text-blue text-0.5 font-medium"
          />
        </div>
      </div>
    </div>
  );
}
