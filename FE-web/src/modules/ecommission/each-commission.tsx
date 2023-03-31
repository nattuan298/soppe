import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import Image from "src/components/image";
import NumberFormatCustome from "src/components/text/number-format";
import { stringNumberToStringWithToFix } from "src/utils";
import { CommissionReportType } from "types/api-response-type";

const EachCommission = ({
  index,
  data,
  screen,
}: {
  index: number;
  data: CommissionReportType;
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
        <div className="text-sm font-medium text-orange text-center md:w-[7%] w-[20%]">
          <NumberFormatCustome value={data.round} />
        </div>
        <div className="text-sm font-medium md:w-[7%] w-[20%]">
          <Image
            src="/assets/images/country/thailand.svg"
            style={{ width: 16, height: 16 }}
            className="ml-3"
          />
        </div>
        <div className="text-sm font-medium md:w-[14%] w-[35%] hidden sm:block">
          {dayjs(data.fromDate).format("DD-MM-YYYY")}
        </div>
        {/* Mobile  */}
        <div className="text-sm font-medium md:w-[14%] w-[35%] block sm:hidden">
          {dayjs(data.fromDate).format("YYYY-MM-DD")}
        </div>
        <div className="text-sm font-medium md:w-[14%] w-[35%] hidden sm:block">
          {dayjs(data.toDate).format("DD-MM-YYYY")}
        </div>
        {/* Mobile  */}
        <div className="text-sm font-medium md:w-[14%] w-[35%] block sm:hidden">
          {dayjs(data.toDate).format("YYYY-MM-DD")}
        </div>
        {screen === "Desktop" && (
          <React.Fragment>
            <div className="text-sm font-medium" style={{ width: "14%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.carryOn)} />
            </div>
            <div className="text-sm font-medium" style={{ width: "13%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.fob)} />
            </div>
            <div className="text-sm font-medium" style={{ width: "13%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.cycle)} />
            </div>
            <div className="text-sm font-medium" style={{ width: "12%" }}>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.smb)} />
            </div>
          </React.Fragment>
        )}

        <div className="flex flex-row-reverse md:w-[6%]">
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
        <>
          {/* <div className={"flex w-full pt-2 rounded pl-3 pr-3"} style={{ height: 75 }}> */}
          <div
            className={"grid grid-cols-5 gap-x-5 w-full pt-2 rounded md:pl-3 pl-7 pr-3"}
            style={{ height: 75 }}
          >
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`matching`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.matching)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`one_time`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.oneTime)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`stockist_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.stockistBonus)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`other_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.otherBonus)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`adjust_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.adjustBonus)} />
            </div>
          </div>

          <div
            className={"grid grid-cols-5 gap-x-5 w-full pt-2 md:pt-6 rounded md:pl-3 pl-7 pr-3"}
            style={{ height: 75 }}
          >
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`total_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.totalBonus)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`carry_on_total_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.totalCarry_bonus)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`carry_on_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.carryOnBonus)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`annual_cu_bonus`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.annualCommBonus)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`vat`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.vat)} />
            </div>
          </div>

          <div
            className={"grid grid-cols-5 gap-x-5 w-full pt-2 md:pt-6 rounded md:pl-3 pl-7 pr-3"}
            style={{ height: 75 }}
          >
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`wht`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.wht)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`transfer_fee`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.freeTransfer)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`voucher`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.voucher)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`transfer_to_ecomm`}</p>
              <NumberFormatCustome value={stringNumberToStringWithToFix(data.transferEcomm)} />
            </div>
            <div className="md:text-sm text-[10px]">
              <p className="font-medium mb-2">{t`transfer_date`}</p>
              {dayjs(data.payDate).format("DD-MM-YYYY")}
            </div>
          </div>
        </>
      )}
      {isOpen && screen === "Mobile" && (
        <>
          {/* <div className={"flex w-full pt-2 rounded pl-3 pr-3"} style={{ height: 75 }}> */}
          <div
            className={
              "grid grid-cols-5 grid-row-2 gap-x-2 w-full pt-2 rounded px-[20px] h-[60px] md:text-sm text-[10px]"
            }
          >
            <p className="font-medium">{t("carry_on")}</p>
            <p className="font-medium">{t("fob")}</p>
            <p className="font-medium">{t("cycle")}</p>
            <p className="font-medium">{t("smb")}</p>
            <p className="font-medium">{t`matching`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.carryOn)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.fob)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.cycle)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.smb)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.matching)} />
          </div>
          <div
            className={
              "grid grid-cols-5 gap-x-2 w-full pt-2 rounded px-[20px] h-[70px] md:text-sm text-[10px]"
            }
          >
            <p className="font-medium ">{t`one_time`}</p>
            <p className="font-medium w-1/2">{t`stockist_bonus`}</p>
            <p className="font-medium w-1/2">{t`other_bonus`}</p>
            <p className="font-medium w-1/2">{t`adjust_bonus`}</p>
            <p className="font-medium w-1/2">{t`total_bonus`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.oneTime)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.stockistBonus)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.otherBonus)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.adjustBonus)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.totalBonus)} />
          </div>
          <div
            className={
              "grid grid-cols-5 gap-x-2 w-full pt-2 rounded px-[20px] h-[70px] md:text-sm text-[10px]"
            }
          >
            <p className="font-medium">{t`carry_on_total_bonus`}</p>
            <p className="font-medium">{t`carry_on_bonus`}</p>
            <p className="font-medium">{t`annual_cu_bonus`}</p>
            <p className="font-medium">{t`vat`}</p>
            <p className="font-medium">{t`wht`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.totalCarry_bonus)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.carryOnBonus)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.annualCommBonus)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.vat)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.wht)} />
          </div>
          <div
            className={
              "grid grid-cols-5 gap-x-2 w-full pt-2 md:pt-6 rounded px-[20px] h-[70px] md:text-sm text-[10px]"
            }
          >
            <p className="font-medium col-span-1 w-1/2">{t`transfer_fee`}</p>
            <p className="font-medium col-span-1">{t`voucher`}</p>
            <p className="font-medium col-span-1">{t`transfer_to_ecomm`}</p>
            <p className="font-medium col-span-2 w-1/4">{t`transfer_date`}</p>
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.freeTransfer)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.voucher)} />
            <NumberFormatCustome value={stringNumberToStringWithToFix(data.transferEcomm)} />
            <div>{dayjs(data.payDate).format("YYYY-MM-DD")}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default EachCommission;
