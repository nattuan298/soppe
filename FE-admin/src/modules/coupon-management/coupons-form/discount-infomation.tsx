import { useTranslation } from "react-i18next";
import { CollapsibleBlock, Select } from "src/components";
import {
  getCapAtError,
  getDiscountAmountError,
  getDiscountCate,
  getDiscountPercentageError,
  getDiscountType,
} from "../constants";
import { Coupon, CouponChildProps, DiscountCategory, DiscountType } from "src/types/coupon.model";
import { NumberFormatter } from "src/components/number-format";
import { withValueCap } from "src/lib/common.lib";

export function DiscountInfomation({
  coupon,
  onChangeCoupon,
  couponErr,
  onChangeError,
}: CouponChildProps) {
  const { t } = useTranslation("common");
  const { discountCategory, discountType, discountAmount, discountPercentage, capAt } = coupon;
  function handleUpdateCoupon(newUpdate: Partial<Coupon>) {
    onChangeCoupon({ ...coupon, ...newUpdate });
  }

  function handleChangeDiscountType(type: DiscountType) {
    const discountType = type as DiscountType;
    let data = { discountType } as Coupon;
    if (discountType === "Fix Amount Discount") {
      data = {
        ...data,
        discountPercentage: 0,
        capAt: 0,
      };
    }
    if (discountType === "Percentage Discount") {
      data = {
        ...data,
        discountAmount: 0,
      };
    }
    handleUpdateCoupon(data);
  }

  return (
    <div>
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("coupon-discount-infomation")}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-[42%]">
          <Select
            label={t("coupon-discount-category")}
            required
            className="w-full"
            defaultValue={discountCategory}
            options={getDiscountCate(t)}
            onChange={(cate) => handleUpdateCoupon({ discountCategory: cate as DiscountCategory })}
          />

          <Select
            label={t("coupon-discount-type")}
            required
            className="w-full"
            defaultValue={discountType}
            options={getDiscountType(t)}
            onChange={(type) => handleChangeDiscountType(type as DiscountType)}
          />

          {discountType === "Fix Amount Discount" && (
            <NumberFormatter
              allowNegative={false}
              thousandSeparator
              isAllowed={withValueCap({ min: 1 })}
              label={t("coupon-discount-amount")}
              required
              placeholder={t("coupon-discount-amount")}
              onValueChange={(e) => {
                const discountAmount = e.floatValue;
                onChangeError({
                  ...couponErr,
                  discountAmount: getDiscountAmountError(t, discountType, discountAmount),
                });
                handleUpdateCoupon({ discountAmount });
              }}
              errorMessage={t(couponErr.discountAmount as "to_ship")}
              value={discountAmount ? discountAmount : undefined}
            />
          )}

          {discountType === "Percentage Discount" && (
            <>
              <NumberFormatter
                allowNegative={false}
                isAllowed={withValueCap({ min: 1, max: 100 })}
                thousandSeparator
                label={t("coupon-discount-percentage")}
                required
                placeholder={t("coupon-discount-percentage")}
                onValueChange={(v) => {
                  const percent = v.floatValue;
                  onChangeError({
                    ...couponErr,
                    discountPercentage: getDiscountPercentageError(t, discountType, percent),
                  });
                  handleUpdateCoupon({ discountPercentage: percent });
                }}
                errorMessage={t(couponErr.discountPercentage as "to_ship")}
                value={discountPercentage ? discountPercentage : undefined}
              />

              <NumberFormatter
                label={t("coupon-cap-at")}
                required
                allowNegative={false}
                isAllowed={withValueCap({ min: 1 })}
                thousandSeparator
                placeholder={t("coupon-cap-at")}
                onValueChange={(e) => {
                  const capAt = e.floatValue;
                  onChangeError({ ...couponErr, capAt: getCapAtError(t, discountType, capAt) });
                  handleUpdateCoupon({ capAt });
                }}
                errorMessage={t(couponErr.capAt as "to_ship")}
                value={capAt ? capAt : undefined}
              />
            </>
          )}
        </div>
      </CollapsibleBlock>
    </div>
  );
}
