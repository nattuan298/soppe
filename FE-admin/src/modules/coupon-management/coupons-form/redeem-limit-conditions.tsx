import { useTranslation } from "react-i18next";
import { CollapsibleBlock, Label, Radio, Select } from "src/components";
import { NumberFormatter } from "src/components/number-format";
import { withValueCap } from "src/lib/common.lib";
import {
  CouponChildProps,
  CouponErorType,
  FrequencyType,
  RedeemLimit,
} from "src/types/coupon.model";
import {
  getCouponLimitError,
  getMinimunPurError,
  getRedeemType,
  getUserLimitError,
} from "../constants";

type RedeemLimitType = "user" | "coupon";
export function RedeemLimitConditions({
  coupon,
  onChangeCoupon,
  couponErr,
  onChangeError,
}: CouponChildProps) {
  const { miniumPurchaseAmount, couponRedeemLimit, userRedeemLimit } = coupon;
  const { t } = useTranslation("common");

  function handleChangeRedeemLimit(redeem: RedeemLimit, type: RedeemLimitType) {
    type === "coupon" && onChangeCoupon({ ...coupon, couponRedeemLimit: redeem });
    type === "user" && onChangeCoupon({ ...coupon, userRedeemLimit: redeem });
  }
  return (
    <div>
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("coupon-redeem-conditions")}>
        <div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-[42%]">
            <NumberFormatter
              label={t("coupon-min-purchase-amount")}
              required
              isAllowed={withValueCap({ min: 1 })}
              allowNegative={false}
              thousandSeparator
              placeholder={t("coupon-min-purchase-amount")}
              onValueChange={(e) => {
                const minimum = e.floatValue;
                onChangeError({
                  ...couponErr,
                  miniumPurchaseAmount: getMinimunPurError(t, minimum),
                });
                onChangeCoupon({
                  ...coupon,
                  miniumPurchaseAmount: minimum || 0,
                });
              }}
              errorMessage={t(couponErr.miniumPurchaseAmount as "to_ship")}
              value={miniumPurchaseAmount ? miniumPurchaseAmount : undefined}
            />
          </div>

          <SelectRedeemLimit
            label={t("coupon-copon-redeem-limit")}
            type="coupon"
            isUnlimited={couponRedeemLimit.isUnlimited}
            limitValue={couponRedeemLimit.limitAmount}
            frequency={couponRedeemLimit.frequency}
            onChangeRedeemLimit={(redeem) => handleChangeRedeemLimit(redeem, "coupon")}
            errors={couponErr}
            onChangeError={onChangeError}
          />
          <SelectRedeemLimit
            label={t("coupon-user-redeem-limit")}
            type="user"
            isUnlimited={userRedeemLimit.isUnlimited}
            limitValue={userRedeemLimit.limitAmount}
            frequency={userRedeemLimit.frequency}
            onChangeRedeemLimit={(redeem) => handleChangeRedeemLimit(redeem, "user")}
            errors={couponErr}
            onChangeError={onChangeError}
          />
        </div>
      </CollapsibleBlock>
    </div>
  );
}

interface SelectRedeemLimitProps {
  label: string;
  type: RedeemLimitType;
  isUnlimited: boolean;
  limitValue?: number;
  frequency: FrequencyType;
  onChangeRedeemLimit: (redeem: RedeemLimit) => void;
  errors: CouponErorType;
  onChangeError: (err: CouponErorType) => void;
}

function SelectRedeemLimit({
  label,
  type,
  isUnlimited,
  limitValue,
  frequency,
  onChangeRedeemLimit,
  errors,
  onChangeError,
}: SelectRedeemLimitProps) {
  const { t } = useTranslation("common");
  const isUser = type === "user";

  function handleChangeRedeem(redeem: RedeemLimit) {
    onChangeRedeemLimit(redeem);
  }
  return (
    <div className="flex flex-col">
      <div className="mt-4">
        <Label required>{label}</Label>
        <div className="radio-group">
          <div className="float-left flex justify-between items-center ">
            <Radio
              checked={isUnlimited}
              onChange={() => {
                !isUser
                  ? onChangeError({ ...errors, couponLimit: "" })
                  : onChangeError({ ...errors, userLimit: "" });
                handleChangeRedeem({
                  isUnlimited: true,
                  limitAmount: 0,
                  frequency: "Per Day",
                });
              }}
              value={"1"}
              name="radio-button-demo"
            />
            <label>
              <span className="text-sm">{t("unlimited")}</span>
            </label>
          </div>
          <div className="float-left flex justify-between items-center pl-12">
            <Radio
              checked={!isUnlimited}
              onChange={() =>
                handleChangeRedeem({
                  isUnlimited: false,
                  limitAmount: limitValue,
                  frequency,
                })
              }
              value={"0"}
              name="radio-button-demo"
            />
            <label>
              <span className="text-sm">{t("limit")}</span>
            </label>
          </div>
        </div>
      </div>

      {!isUnlimited && (
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-[42%] mt-2">
          <NumberFormatter
            required
            placeholder={t("coupon-redeem-limit")}
            isAllowed={withValueCap({ min: 1 })}
            allowNegative={false}
            thousandSeparator
            onValueChange={(e) => {
              const limit = e.floatValue;
              !isUser &&
                onChangeError({
                  ...errors,
                  couponLimit: getCouponLimitError(t, isUnlimited, limit),
                });
              isUser &&
                onChangeError({
                  ...errors,
                  userLimit: getUserLimitError(t, isUnlimited, limit),
                });
              onChangeRedeemLimit({
                isUnlimited,
                limitAmount: limit || 0,
                frequency,
              });
            }}
            errorMessage={
              isUser ? t(errors.userLimit as "to_ship") : t(errors.couponLimit as "to_ship")
            }
            value={limitValue ? limitValue : undefined}
          />
          <Select
            required
            className="w-full"
            defaultValue={frequency}
            options={getRedeemType(t)}
            onChange={(fre) =>
              onChangeRedeemLimit({
                isUnlimited,
                limitAmount: limitValue,
                frequency: fre as FrequencyType,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
