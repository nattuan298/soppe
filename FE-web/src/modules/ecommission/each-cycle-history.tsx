import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import NumberFormatCustome from "src/components/text/number-format";
import { stringNumberToStringWithToFix } from "src/utils";
import { CycleHistoryType } from "types/api-response-type";

const EachCycleHistory = ({
  item,
  index,
  screen,
}: {
  item: CycleHistoryType;
  index: number;
  screen: string;
}) => {
  const { t } = useTranslation("common");
  const [isOpen, setisOpen] = useState(false);

  const handleToggleButton = () => {
    setisOpen((preState) => !preState);
  };

  return (
    <div
      className={`w-full ${index % 2 === 0 ? "" : "bg-lighterGray"}`}
      style={{ height: isOpen ? "auto" : 70, border: isOpen ? "1px solid #FF7500" : "none" }}
    >
      <div className="flex w-full items-center rounded pl-3 pr-3" style={{ height: 70 }}>
        <div className="text-sm font-medium md:w-[14%] w-[45%] hidden sm:block">
          {dayjs(item.date).format("DD-MM-YYYY")}
        </div>
        {/* This is Mobile*/}
        <div className="text-sm font-medium md:w-[14%] w-[45%] block sm:hidden">
          {dayjs(item.date).format("YYYY-MM-DD")}
        </div>
        <div className="text-sm font-medium md:w-[8%] w-[25%]">{item.cycle}</div>
        <div className="text-sm font-medium text-orange md:w-[14%] w-[25%]">
          <NumberFormatCustome value={stringNumberToStringWithToFix(item.total)} />
        </div>
        {screen === "Desktop" && (
          <React.Fragment>
            <div className="text-sm font-medium" style={{ width: "15%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(item.oldLeft)} />
            </div>
            <div className="text-sm font-medium" style={{ width: "15%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(item.oldRight)} />
            </div>
            <div className="text-sm font-medium" style={{ width: "15%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(item.newLeft)} />
            </div>
            <div className="text-sm font-medium" style={{ width: "15%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(item.newRight)} />
            </div>
          </React.Fragment>
        )}

        <div className="flex flex-row-reverse md:w-[5%]">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
              index % 2 !== 0 ? "bg-white" : "bg-lighterGray"
            }`}
            onClick={handleToggleButton}
          >
            {!isOpen && <KeyboardArrowDownIcon fontSize="small" />}
            {isOpen && <KeyboardArrowUpIcon fontSize="small" className="text-orange" />}
          </div>
        </div>
      </div>

      {isOpen && screen === "Desktop" && (
        <div
          className={"flex w-full mt-2 rounded pl-3 pr-3"}
          // key={index}
          style={{ height: 80 }}
        >
          <div className="text-sm" style={{ width: "17%" }}>
            <p className="font-medium mb-2">{t`sum_left`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.sumLeft)} />
          </div>
          <div className="text-sm" style={{ width: "18%" }}>
            <p className="font-medium mb-2">{t`sum_right`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.sumRight)} />
          </div>
          <div className="text-sm" style={{ width: "16%" }}>
            <p className="font-medium mb-2">{t`result_left`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.resultLeft)} />
          </div>
          <div className="text-sm" style={{ width: "16%" }}>
            <p className="font-medium mb-2">{t`result_right`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.resultRight)} />
          </div>
          <div className="text-sm" style={{ width: "13%" }}>
            <p className="font-medium mb-2">{t`pair`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.pair)} />
          </div>
          <div className="text-sm" style={{ width: "16%" }}>
            <p className="font-medium mb-2">{t`payout_rate`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.payoutRate)} />
          </div>
        </div>
      )}
      {isOpen && screen === "Mobile" && (
        <div
          className={"grid grid-cols-4 gap-5 w-full rounded pl-3 pr-3 pb-3"}
          // key={index}
        >
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`old_left`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.oldLeft)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`old_right`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.oldRight)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`new_left`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.newLeft)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`new_right`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.newRight)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`sum_left`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.sumLeft)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`sum_right`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.sumRight)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`result_left`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.resultLeft)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`result_right`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.resultRight)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`pair`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.pair)} />
          </div>
          <div className="text-[10px]">
            <p className="font-medium mb-2">{t`payout_rate`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(item.payoutRate)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EachCycleHistory;
