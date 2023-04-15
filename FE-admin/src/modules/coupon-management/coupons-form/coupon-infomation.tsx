import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleBlock, Input, Label, Select, SelectCountry2 } from "src/components";
import { getStatus } from "src/constants/common.constants";
import { StatusElement } from "src/types/common.modal";
import { CouponChildProps } from "src/types/coupon.model";
import { getCodeError, getNameError } from "../constants";

export function CouponInfomation({
  coupon,
  onChangeCoupon,
  couponErr,
  onChangeError,
  type,
}: CouponChildProps & { type: "Create" | "Edit" }) {
  const { t } = useTranslation("common");
  const { name, locationBase, code, status } = coupon;

  return (
    <div>
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("coupon-infomation")}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-[42%]">
          <Input
            label={t("coupon-name")}
            required
            placeholder={t("coupon-name")}
            onChange={(e) => {
              onChangeError({ ...couponErr, name: getNameError(t, e.target.value) });
              onChangeCoupon({ ...coupon, name: e.target.value });
            }}
            errorMessage={t(couponErr.name as "to_ship")}
            value={name}
            inputProps={{
              maxLength: 255,
            }}
          />

          <div>
            <Label required>{t("location-base")}</Label>
            <SelectCountry2
              country={locationBase}
              onSelect={(locationBase) => onChangeCoupon({ ...coupon, locationBase })}
              className="dropdown"
              disabled={type === "Edit"}
            />
          </div>

          <Input
            label={t("coupon-code")}
            required
            disabled={type === "Edit"}
            placeholder={t("coupon-code")}
            onChange={(e) => {
              onChangeError({ ...couponErr, code: getCodeError(t, e.target.value) });
              onChangeCoupon({ ...coupon, code: e.target.value });
            }}
            errorMessage={t(couponErr.code as "to_ship")}
            value={code}
            inputProps={{
              maxLength: 255,
            }}
          />
          <Select
            label={t("status")}
            required
            className="w-full"
            placeholder={t("status")}
            defaultValue={status}
            options={getStatus(t, true)}
            onChange={(status) => onChangeCoupon({ ...coupon, status: status as StatusElement })}
          />
        </div>
      </CollapsibleBlock>
    </div>
  );
}
