import { useTranslation } from "react-i18next";
import { Label, Search, SelectPriceRange } from "src/components";
import { InputDatePicker2 } from "src/components/date-range-2";
import { CouponParams } from "src/types/coupon.model";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export interface CouponSearchBoxProps {
  searchParams: CouponParams;
  onSearchValueChange: (searchValue: CouponParams) => void;
  maxPrice: number;
}

export function CouponHistorySearchBox({
  searchParams,
  onSearchValueChange,
  maxPrice = 1,
}: CouponSearchBoxProps) {
  const { t } = useTranslation("common");

  const { redeemMinAmount, redeemMaxAmount, redeemStartDate, redeemEndDate, keyword } =
    searchParams;
  const [range, setRange] = useState({ start: redeemMinAmount!, end: redeemMaxAmount! });
  useEffect(() => {
    setRange({ start: redeemMinAmount!, end: redeemMaxAmount! });
  }, [redeemMinAmount, redeemMaxAmount]);

  function handleSelectDateChange(startDate: Date | undefined, endDate: Date | undefined) {
    onSearchValueChange({
      redeemStartDate: startDate ? startDate.toISOString() : "",
      redeemEndDate: endDate ? endDate.toISOString() : "",
    });
  }

  function handleKeywordChange(keyword: string) {
    onSearchValueChange({ keyword });
  }

  function handleRedeemChange() {
    if (range.end > maxPrice) return;
    let startAmount = range.start;
    let endAmount = range.end;
    if (startAmount > endAmount) {
      startAmount = range.end;
      endAmount = range.start;
    }
    onSearchValueChange({ redeemMinAmount: startAmount, redeemMaxAmount: endAmount });
  }

  return (
    <div className="flex justify-between items-center bg-white w-full">
      <div className="flex space-x-7">
        <div>
          <Label>{t("coupon-redeem-period")}</Label>
          <InputDatePicker2
            handleSelect={(startDate, endDate) => handleSelectDateChange(startDate, endDate)}
            className="h-12 focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic w-[288px] 2xl:w-[343px]"
            defaultFrom={redeemStartDate ? dayjs(redeemStartDate).toDate() : undefined}
            defaultTo={redeemEndDate ? dayjs(redeemEndDate).toDate() : undefined}
            placeholder={t("coupon-redeem-period")}
            notAllowedUnexpired={true}
          />
        </div>
        <div>
          <Label>{t("coupon-redeem-amount")}</Label>
          <SelectPriceRange
            couponHistory
            showAllLabel
            className="dropdown"
            min={0}
            max={maxPrice}
            range={range}
            setRange={setRange}
            handleChangePrice={handleRedeemChange}
          />
        </div>
      </div>
      <div>
        <Search
          className="w-[310px] wide:w-[350px]"
          placeholder={t`search`}
          onSearch={handleKeywordChange}
          value={keyword}
        />
      </div>
    </div>
  );
}
