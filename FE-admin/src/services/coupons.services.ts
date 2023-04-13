import { config } from "src/constants/config";
import { ApiResponseError, List } from "src/types/common.modal";
import { toQueryString } from "src/lib/common.lib";
import { execute } from "src/lib/execute";
import { Coupon, CouponHistory, CouponParams } from "src/types/coupon.model";

const URL = `${config.apiBaseUrl}/admin/coupons`;
export function getCounponsService(params?: CouponParams) {
  return execute.get<List<Coupon>>(toQueryString(URL, params));
}

export function getDetailCouponService(id: string) {
  return execute.get<Coupon>(`${URL}/${id}`);
}

export function getHistoryCouponService(id: string = "", params: CouponParams) {
  const validParams = {
    ...params,
    redeemMinAmount: params.redeemMinAmount + "",
    redeemMaxAmount: params.redeemMaxAmount + "",
  };

  if (params.redeemMinAmount === 0 && params.redeemMaxAmount === 0) {
    validParams.redeemMinAmount = "";
    validParams.redeemMaxAmount = "";
  }
  return execute.get<CouponHistory>(toQueryString(`${URL}/${id}/history`, validParams));
}

export function addCouponService(payload: Partial<Coupon>) {
  return execute.post(URL, payload);
}

export function updateCouponService(id: string = "", payload: Partial<Coupon>) {
  return execute.patch<ApiResponseError>(`${URL}/${id}`, payload);
}

export function deleteCouponService(id: string) {
  return execute.delete<ApiResponseError>(`${URL}/${id}`);
}
