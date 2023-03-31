import { useMemo } from "react";
import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { TripProcessBarType } from "src/feature/trip-process-pv/type";
import { formatNumber } from "src/lib/format";
import { MedalOrange } from "..";
import { Point } from "./point";
import styles from "./style.module.css";

export type TripProcessBarProps = {
  title: string;
  data: TripProcessBarType;
};
export function TripProcessBar({ title, data }: TripProcessBarProps) {
  const { t } = useTranslation("common");
  const { currentPoint, initialPoint, firstSeatPoint, secondSeatPoint, remainingNumber, tripName } =
    data;

  const isZero = [currentPoint, firstSeatPoint, secondSeatPoint].every((item) => item === 0);

  const percentFollowTier =
    currentPoint <= firstSeatPoint
      ? currentPoint / (firstSeatPoint / 100)
      : (currentPoint - firstSeatPoint) / ((secondSeatPoint - firstSeatPoint) / 100);

  const currentPointText = formatNumber(currentPoint) + " TP";
  const isRechiveTierOne = currentPoint > firstSeatPoint;

  const pvAmounClass = "w-[100px] absolute break-words text-center";

  const progressPercentFollowTier = useMemo(() => {
    if (percentFollowTier > 100) {
      return 100;
    }
    if (percentFollowTier < 0) {
      return 0;
    }
    return percentFollowTier;
  }, [percentFollowTier]);

  if (isZero) {
    return (
      <div className="h-56 shadow-modalSummary rounded-xl w-full p-5" style={{ height: 100 }}>
        <div className="flex justify-between">
          <p className="text-sm">{title}</p>
        </div>
        <div className="w-full mt-14 relative">
          <div className="h-1 bg-[#F4F5FA] w-[91%] ml-5"></div>
          <div className="flex top-0 absolute w-[91%] ml-5">
            <div className="w-1/2 relative">
              <div className="w-full h-1 bg-[#F4F5FA]"></div>
              <div className="absolute top-0 w-full">
                <Point className="absolute top-[-3px]" />
                <div
                  className="h-1 bg-orange"
                  style={{
                    width: 0 + "%",
                  }}
                ></div>
                <Point
                  showTooltip
                  textTooltip={currentPointText}
                  className="absolute top-[-3px]"
                  style={{
                    left: 0 + "%",
                  }}
                />
              </div>
            </div>

            <div className="w-1/2 relative">
              <div className="w-full h-1 bg-[#F4F5FA]"></div>
              <div className="absolute top-0 w-full">
                <div
                  className=" h-1 bg-orange"
                  style={{
                    width: 0 + "%",
                  }}
                ></div>
                <Point
                  className="absolute top-[-3px]"
                  style={{
                    left: 0 + "%",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="relative top-[-3px] left-[5px] w-[91%] ml-5 flex items-center ">
            <div className="w-1/2 absolute">
              <div className=" absolute right-[-6px] top-[-10px] bg-white rounded-full border border-orange">
                <MedalOrange
                  className={classNames(
                    "w-5 h-5 rounded-full p-1 fill-current",
                    "bg-[#FF75001A] text-orange",
                  )}
                />
              </div>
            </div>

            <div className="absolute right-[-7px] bg-white rounded-full border border-orange">
              <MedalOrange
                className={classNames(
                  "w-6 h-6 rounded-full p-1 fill-current",
                  "bg-[#FF75001A] text-orange",
                )}
              />
            </div>
          </div>

          <div className="relative flex justify-between mt-8 text-lg text-[#0075C9]">
            <p className={pvAmounClass}>{formatNumber(initialPoint)} TP</p>
            <p className={styles.tripFirstStep}>{formatNumber(firstSeatPoint)} TP</p>
            <p className={pvAmounClass + " right-0"}>{formatNumber(secondSeatPoint)} TP</p>
          </div>

          <div className="mt-10 flex">
            <p className="m-auto text-sm" style={{ color: "#231F20" }}>
              {tripName && tripName}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-56 shadow-modalSummary rounded-xl w-full p-5" style={{ height: 100 }}>
      <div className="flex justify-between">
        <p className="text-sm">{title}</p>
        {remainingNumber && remainingNumber > 0 ? (
          <p className="text-xs">
            {t("you-need")} <span className="text-orange">{remainingNumber}</span>{" "}
            {t("more-trip-tp")}
          </p>
        ) : (
          <p className="text-xs text-green-400">{t("completed")}</p>
        )}
      </div>

      <div className="w-full mt-14 relative">
        <div className="h-1 bg-[#F4F5FA] w-[91%] ml-5"></div>

        <div className="flex top-0 absolute w-[91%] ml-5">
          <div className="w-1/2 relative">
            <div className="w-full h-1 bg-[#F4F5FA]"></div>
            <div className="absolute top-0 w-full">
              <Point className="absolute top-[-3px]" />
              {currentPoint > firstSeatPoint && (
                <div
                  className="h-1 bg-orange"
                  style={{
                    width: 100 + "%",
                  }}
                ></div>
              )}
              {!isRechiveTierOne && (
                <>
                  <div
                    className="h-1 bg-orange"
                    style={{
                      width: progressPercentFollowTier + "%",
                    }}
                  ></div>
                  <Point
                    showTooltip
                    textTooltip={currentPointText}
                    className="absolute top-[-3px]"
                    style={{
                      left: progressPercentFollowTier + "%",
                    }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="w-1/2 relative">
            <div className="w-full h-1 bg-[#F4F5FA]"></div>
            <div className="absolute top-0 w-full">
              {isRechiveTierOne && (
                <>
                  <div
                    className=" h-1 bg-orange"
                    style={{
                      width: progressPercentFollowTier + "%",
                    }}
                  ></div>
                  <Point
                    textTooltip={currentPointText}
                    className="absolute top-[-3px]"
                    showTooltip
                    style={{
                      left: progressPercentFollowTier + "%",
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative top-[-3px] left-[5px] w-[91%] ml-5 flex items-center ">
          <div className="w-1/2 absolute">
            <div className=" absolute right-[-6px] top-[-10px] bg-white rounded-full border border-orange">
              <MedalOrange
                className={classNames(
                  "w-5 h-5 rounded-full p-1 fill-current",
                  currentPoint >= firstSeatPoint
                    ? "bg-orange text-white"
                    : "bg-[#FF75001A] text-orange",
                )}
              />
            </div>
          </div>

          <div className="absolute right-[-7px] bg-white rounded-full border border-orange">
            <MedalOrange
              className={classNames(
                "w-6 h-6 rounded-full p-1 fill-current",
                remainingNumber ? "bg-[#FF75001A] text-orange" : "bg-orange text-white",
              )}
            />
          </div>
        </div>

        <div className="relative flex justify-between mt-8 text-lg text-[#0075C9]">
          <p className={pvAmounClass}>{formatNumber(initialPoint)} TP</p>
          <p className={styles.tripFirstStep}>{formatNumber(firstSeatPoint)} TP</p>
          <p className={pvAmounClass + " right-0"}>{formatNumber(secondSeatPoint)} TP</p>
        </div>

        <div className="mt-10 flex">
          <p className="m-auto text-sm" style={{ color: "#231F20" }}>
            {tripName && tripName}
          </p>
        </div>
      </div>
    </div>
  );
}
