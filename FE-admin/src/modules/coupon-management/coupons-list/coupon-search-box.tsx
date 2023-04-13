import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { ButtonLink, Label, Search, Select, SelectCountry2 } from "src/components";
import { InputDatePicker2 } from "src/components/date-range-2";
import { getStatus } from "src/constants/common.constants";
import { ListCountryPhoneCode } from "src/constants/country_phone_code";
import { CouponParams, DiscountCategory } from "src/types/coupon.model";
import dayjs from "dayjs";
import { getDiscountCate } from "../constants";
import { routeCouponCreate } from "src/constants/routes";
import { useMemo } from "react";

const FIELD_CLASS = "2xl:w-[250px] w-[150px]";
export interface CouponSearchBoxProps {
  searchParams: CouponParams;
  onSearchValueChange: (searchValue: CouponParams) => void;
}

export function CouponSearchBox({ searchParams, onSearchValueChange }: CouponSearchBoxProps) {
  const { t } = useTranslation("common");

  const { locationBase, status, discountCategory, redeemStartDate, redeemEndDate, keyword } =
    searchParams;

  const isSafari = useMemo(
    () =>
      navigator.vendor &&
      navigator.vendor.indexOf("Apple") > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf("CriOS") === -1 &&
      navigator.userAgent.indexOf("FxiOS") === -1,
    [],
  );

  function handleSelectDateChange(startDate: Date | undefined, endDate: Date | undefined) {
    onSearchValueChange({
      redeemStartDate: startDate ? startDate.toISOString() : "",
      redeemEndDate: endDate ? endDate.toISOString() : "",
    });
  }

  function handleKeywordChange(keyword: string) {
    onSearchValueChange({ keyword: keyword.trim() });
  }

  return (
    <div className="bg-white mb-5 search-filter shadow-boxWrapper p-3 rounded-primary min-w-min">
      <div className="w-full flex justify-between">
        <div className="flex flex-grow space-x-4 min-w-[770px]">
          <div className={FIELD_CLASS}>
            <Label>{t("location-base")}</Label>
            <SelectCountry2
              options={[
                {
                  name: "all_countries",
                  code: "10000",
                  flag: "/assets/images/country/globe.png",
                  value: "All",
                },
                ...ListCountryPhoneCode,
              ]}
              country={locationBase || "All"}
              onSelect={(locate) => {
                const searchValue = locate === "All" ? "" : locate;
                onSearchValueChange({ locationBase: searchValue || "" });
              }}
              className="w-full"
            />
          </div>

          <div className={FIELD_CLASS}>
            <Label>{t("status")}</Label>
            <Select
              className="w-full"
              placeholder={t("status")}
              defaultValue={status || "All"}
              options={getStatus(t)}
              onChange={(status) => {
                const searchValue = status === "All" ? "" : status;
                onSearchValueChange({ status: searchValue || "" });
              }}
            />
          </div>
          <div className={FIELD_CLASS}>
            <Label>{t("coupon-discount-category")}</Label>
            <Select
              className="w-full"
              placeholder={t("coupon-discount-category")}
              defaultValue={discountCategory || "All"}
              options={getDiscountCate(t, true)}
              onChange={(cate) => {
                const searchValue = cate === "All" ? "" : cate;
                onSearchValueChange({ discountCategory: searchValue as DiscountCategory });
              }}
            />
          </div>
          <div className={FIELD_CLASS}>
            <Label>{t("coupon-redeem-period")}</Label>
            <InputDatePicker2
              handleSelect={(startDate, endDate) => handleSelectDateChange(startDate, endDate)}
              className="h-12 focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic wide:w-[250px] w-[230px]"
              defaultFrom={redeemStartDate ? dayjs(redeemStartDate).toDate() : undefined}
              defaultTo={redeemEndDate ? dayjs(redeemEndDate).toDate() : undefined}
              placeholder={t("all")}
              notAllowedUnexpired={true}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Search
            className={`2xl:w-[${isSafari ? "250px" : "400px"}] w-[250px]`}
            placeholder={t`search`}
            onSearch={handleKeywordChange}
            value={keyword}
          />
          <ButtonLink
            to={routeCouponCreate}
            variant="text"
            className={`bg-orange-light text-white 2xl:px-[${
              isSafari ? "20px" : "70px"
            }] px-5 py-3 hover:bg-orange-hover flex-shrink-0 mr-3`}
          >
            {t("coupon-create-new-coupon")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
