import { CategoryModel } from "./../../types/category.model";
import { TFunction } from "i18next";
import { AutoCompleteOptionType, OptionType } from "src/components";
import { Coupon, DiscountType } from "src/types/coupon.model";

export const DEFAULT_COUPON: Coupon = {
  name: "",
  code: "",
  status: "Active",
  locationBase: "Thailand",
  discountCategory: "Product Price",
  discountType: "Fix Amount Discount",
  couponRedeemLimit: {
    isUnlimited: false,
    frequency: "Per Day",
  },
  userRedeemLimit: {
    isUnlimited: false,
    frequency: "Per Day",
  },
  totalRedeem: 0,
  isAbleToDelete: false,
  isAllProductCategories: false,
  productCategories: [],
  description: "",
};

export const DEFAULT_COUPON_ERR = {
  name: "",
  code: "",
  date: "",
  discountAmount: "",
  discountPercentage: "",
  capAt: "",
  category: "",
  miniumPurchaseAmount: "",
  couponLimit: "",
  userLimit: "",
};

export function getDiscountCate(t: TFunction, addAll?: boolean): OptionType[] {
  const type: OptionType[] = [
    {
      title: t("product_price"),
      value: "Product Price",
    },
    {
      title: t("shipping_fee"),
      value: "Shipping Fee",
    },
    {
      title: t("subscription_fee"),
      value: "Subscription Fee",
    },
  ];
  addAll &&
    type.unshift({
      title: t("all-categories"),
      value: "All",
    });
  return type;
}

export function getDiscountType(t: TFunction): OptionType[] {
  return [
    {
      title: t("fix-amount-discount"),
      value: "Fix Amount Discount",
    },
    {
      title: t("percent-discount"),
      value: "Percentage Discount",
    },
  ];
}

export function getRedeemType(t: TFunction): OptionType[] {
  return [
    {
      title: t("per_day"),
      value: "Per Day",
    },
    {
      title: t("per_month"),
      value: "Per Month",
    },
    {
      title: t("per_coupon"),
      value: "Per Coupon",
    },
  ];
}

export function getDateError(t: TFunction, startDate?: Date | string, endDate?: Date | string) {
  return !startDate && !endDate ? "required_fields" : "";
}

export function getCateError(
  t: TFunction,
  category: string[] | CategoryModel[] | AutoCompleteOptionType[],
  noError?: string,
) {
  return category.length <= 0 && noError !== "Subscription Fee" ? "required_fields" : "";
}

export function getNameError(t: TFunction, name: string) {
  return !name.trim() ? "required_fields" : "";
}

export function getCodeError(t: TFunction, code: string) {
  return !code.trim() ? "required_fields" : "";
}

export function getDiscountAmountError(t: TFunction, discountType: DiscountType, amount?: number) {
  return discountType === "Fix Amount Discount" && !amount ? "required_fields" : "";
}

export function getDiscountPercentageError(
  t: TFunction,
  discountType: DiscountType,
  percentage?: number,
) {
  return discountType === "Percentage Discount" && !percentage ? "required_fields" : "";
}

export function getCapAtError(t: TFunction, discountType: DiscountType, capAt?: number) {
  return discountType === "Percentage Discount" && !capAt ? "required_fields" : "";
}

export function getMinimunPurError(t: TFunction, value?: number) {
  return !value ? "required_fields" : "";
}

export function getCouponLimitError(t: TFunction, isUnlimited: boolean, limit?: number) {
  return !isUnlimited && !limit ? "required_fields" : "";
}

export function getUserLimitError(t: TFunction, isUnlimited: boolean, limit?: number) {
  return !isUnlimited && !limit ? "required_fields" : "";
}

export function getCouponFormErr(t: TFunction, coupon: Coupon) {
  const {
    name,
    code,
    discountCategory,
    redeemStartDate,
    redeemEndDate,
    productCategories,
    discountType,
    discountAmount,
    discountPercentage,
    capAt,
    miniumPurchaseAmount,
    couponRedeemLimit,
    userRedeemLimit,
  } = coupon;
  const updateErr = {
    name: getNameError(t, name || ""),
    code: getCodeError(t, code || ""),
    date: getDateError(t, redeemStartDate, redeemEndDate),
    category: getCateError(t, productCategories, discountCategory),
    discountAmount: getDiscountAmountError(t, discountType, discountAmount),
    discountPercentage: getDiscountPercentageError(t, discountType, discountPercentage),
    capAt: getCapAtError(t, discountType, capAt),
    miniumPurchaseAmount: getMinimunPurError(t, miniumPurchaseAmount),
    couponLimit: getCouponLimitError(
      t,
      couponRedeemLimit.isUnlimited,
      couponRedeemLimit.limitAmount,
    ),
    userLimit: getUserLimitError(t, userRedeemLimit.isUnlimited, userRedeemLimit.limitAmount),
  };

  return updateErr;
}
