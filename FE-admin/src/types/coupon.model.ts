import { SearchParams, StatusElement } from "./common.modal";
import { CategoryModel } from "src/types/category.model";
import { AutoCompleteOptionType } from "src/components";

export type DiscountCategory = "Product Price" | "Shipping Free" | "Subscription Fee";
export type DiscountType = "Fix Amount Discount" | "Percentage Discount";
export type FrequencyType = "Per Month" | "Per Day" | "Per Coupon";
export type RedeemLimit = {
  _id?: string;
  isUnlimited: boolean;
  limitAmount?: number;
  frequency: FrequencyType;
};
export interface Coupon {
  _id?: string;
  name: string;
  code: string;
  locationBase: string;
  status: StatusElement;
  redeemStartDate?: string;
  redeemEndDate?: string;
  discountCategory: DiscountCategory;
  discountType: DiscountType;
  discountAmount?: number;
  discountPercentage?: number;
  capAt?: number;
  miniumPurchaseAmount?: number;
  couponRedeemLimit: RedeemLimit;
  userRedeemLimit: RedeemLimit;
  totalRedeem: number;
  isAbleToDelete: boolean;
  isAllProductCategories: boolean;
  productCategories: CategoryModel[] | string[] | AutoCompleteOptionType[];
  description: string;
}

export interface CouponHistoryData {
  orderNumber: string;
  memberId: string;
  redeemDate: string;
  totalPrice: number;
  couponRedeemAmount: number;
}
export interface CouponHistory {
  coupon: {
    _id: string;
    name: string;
    code: string;
    locationBase?: string;
  };
  orders: {
    total: number;
    page: number;
    limit: number;
    data: CouponHistoryData[];
  };
}

export type CouponErorType = {
  name?: string;
  code?: string;
  date?: string;
  discountAmount?: string;
  discountPercentage?: string;
  capAt?: string;
  category?: string;
  miniumPurchaseAmount?: string;
  couponLimit?: string;
  userLimit?: string;
};

export type CouponChildProps = {
  coupon: Coupon;
  onChangeCoupon: (coupon: Coupon) => void;
  couponErr: CouponErorType;
  onChangeError: (errors: CouponErorType) => void;
};

export type CouponParams = SearchParams & {
  _id?: string;
  category?: string;
  locationBase?: string;
  discountCategory?: DiscountCategory;
  redeemStartDate?: string;
  redeemEndDate?: string;
  redeemMinAmount?: number;
  redeemMaxAmount?: number;
};
