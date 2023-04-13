import { call, put } from "redux-saga/effects";
import {
  addCouponService,
  deleteCouponService,
  getCounponsService,
  getDetailCouponService,
  getHistoryCouponService,
  updateCouponService,
} from "src/services/coupons.services";
import {
  setCouponDetail,
  setCouponHistory,
  setCoupons,
  setIsAddingCoupon,
  setIsDeleteCoupon,
  setIsGettingCoupons,
  setIsGettingDetailCoupons,
  setIsGettingHistoryCoupon,
  setIsUpdatingCoupon,
} from "./coupons.slice";
import {
  FETCH_ADD_COUPON_ACTION,
  FETCH_DELETE_COUPON_ACTION,
  FETCH_GET_COUPON_ACTION,
  FETCH_GET__DETAIL_COUPON_ACTION,
  FETCH_HISTORY_COUPON_ACTION,
  FETCH_UPDATE_COUPON_ACTION,
} from "./coupons.type";
import { Coupon, CouponHistory, CouponParams } from "src/types/coupon.model";
import { CallbackResponse, List } from "src/types/common.modal";

// get coupon
export type FetchCoupons = {
  type: string;
  payload: CouponParams;
};
const getCoupon = async (params: CouponParams) => {
  const res = await getCounponsService(params);
  return res.data;
};
export function* watcherGetCoupon(action: FetchCoupons) {
  try {
    yield put(setIsGettingCoupons({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getCoupon(params));
    yield put(setCoupons(response));
  } catch (error) {
    yield put(setIsGettingCoupons({ loading: false }));
  }
}
export const getCouponAction = (payload: CouponParams) => ({
  type: FETCH_GET_COUPON_ACTION,
  payload,
});

// detail coupon
export type FetchDetailCoupon = {
  type: string;
  payload: string;
};
const getDetailCoupon = async (id: string) => {
  const res = await getDetailCouponService(id);
  return res.data;
};
export function* watcherDetailCoupon(action: FetchDetailCoupon) {
  try {
    yield put(setIsGettingDetailCoupons({ loading: true }));
    const id = action.payload;
    const response: Promise<any> = yield call(() => getDetailCoupon(id));
    yield put(setCouponDetail(response));
  } catch (error) {
    yield put(setIsGettingDetailCoupons({ loading: false }));
  }
}
export const getDetailAction = (payload: string) => ({
  type: FETCH_GET__DETAIL_COUPON_ACTION,
  payload,
});

// add coupon
export type FetchAddCoupon = {
  type: string;
  payload: CallbackResponse & { payload: Coupon };
};
const addCoupon = async ({
  payload,
  onSuccess,
  onError,
}: CallbackResponse & { payload: Coupon }) => {
  const res = await addCouponService(payload);
  if (res.status === 201) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherAddCoupon(action: FetchAddCoupon) {
  try {
    yield put(setIsAddingCoupon({ loading: true }));
    yield call(() => addCoupon(action.payload));
    yield put(setIsAddingCoupon({ loading: false }));
  } catch (error) {
    yield put(setIsAddingCoupon({ loading: false }));
  }
}
export const addCouponAction = (payload: CallbackResponse & { payload: Coupon }) => ({
  type: FETCH_ADD_COUPON_ACTION,
  payload,
});

// update coupons
export type FetchUpdateCoupon = {
  type: string;
  payload: CallbackResponse & { payload: Partial<Coupon> };
};
const updateCoupon = async ({
  payload,
  onSuccess,
  onError,
}: CallbackResponse & { payload: Partial<Coupon> }) => {
  const { _id, ...rest } = payload;
  const res = await updateCouponService(_id, rest);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherUpdateCoupon(action: FetchUpdateCoupon) {
  try {
    yield put(setIsUpdatingCoupon({ loading: true }));
    yield call(() => updateCoupon(action.payload));
    yield put(setIsUpdatingCoupon({ loading: false }));
  } catch (error) {
    yield put(setIsUpdatingCoupon({ loading: false }));
  }
}
export const updateCouponAction = (payload: CallbackResponse & { payload: Partial<Coupon> }) => ({
  type: FETCH_UPDATE_COUPON_ACTION,
  payload,
});

// delete coupons
export type FetchDeleteCoupons = {
  type: string;
  payload: CallbackResponse & { id: string };
};
const deleteCoupon = async ({ id, onSuccess, onError }: CallbackResponse & { id: string }) => {
  const res = await deleteCouponService(id);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherDeleteCoupon(action: FetchDeleteCoupons) {
  try {
    yield put(setIsDeleteCoupon({ loading: true }));
    yield call(() => deleteCoupon(action.payload));
    yield put(setIsDeleteCoupon({ loading: false }));
  } catch (error) {
    yield put(setIsDeleteCoupon({ loading: false }));
  }
}
export const deleteCouponAction = (payload: CallbackResponse & { id: string }) => ({
  type: FETCH_DELETE_COUPON_ACTION,
  payload,
});

// get history coupon
export type FetchHistoryCoupon = {
  type: string;
  payload: CouponParams;
};
const getHistoryCoupon = async ({ _id, ...params }: CouponParams) => {
  const res = await getHistoryCouponService(_id, params);
  return res.data;
};
export function* watcherHistoryCoupon(action: FetchHistoryCoupon) {
  try {
    yield put(setIsGettingHistoryCoupon({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getHistoryCoupon(params));
    yield put(setCouponHistory(response));
  } catch (error) {
    yield put(setIsGettingHistoryCoupon({ loading: true }));
  }
}
export const getHistoryCouponAction = (payload: CouponParams) => ({
  type: FETCH_HISTORY_COUPON_ACTION,
  payload,
});
