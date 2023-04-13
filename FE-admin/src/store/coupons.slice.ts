import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CallbackResponse, List } from "src/types/common.modal";
import { Coupon, CouponHistory, CouponParams } from "src/types/coupon.model";
import {
  addCouponService,
  deleteCouponService,
  getHistoryCouponService,
  updateCouponService,
} from "src/services/coupons.services";
import { DEFAULT_COUPON } from "src/modules/coupon-management/constants";

// export const getCoupons = createAsyncThunk("coupons/getCoupons", async (params?: CouponParams) => {
//   const res = await getCounponsService(params);
//   return res.data;
// });

// export const getDetailCoupon = createAsyncThunk("coupons/getDetailCoupon", async (id: string) => {
//   const res = await getDetailCouponService(id);
//   return res.data;
// });

// export const getHistoryCoupon = createAsyncThunk(
//   "coupons/getHistoryCoupon",
//   async ({ _id, ...params }: CouponParams) => {
//     const res = await getHistoryCouponService(_id, params);
//     return res.data;
//   },
// );

// export const addCoupon = createAsyncThunk(
//   "coupons/addCoupon",
//   async ({ payload, onSuccess, onError }: CallbackResponse & { payload: Coupon }) => {
//     const res = await addCouponService(payload);
//     if (res.status === 201) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

// export const updateCoupon = createAsyncThunk(
//   "coupons/updateCoupon",
//   async ({ payload, onSuccess, onError }: CallbackResponse & { payload: Partial<Coupon> }) => {
//     const { _id, ...rest } = payload;
//     const res = await updateCouponService(_id, rest);
//     if (res.status === 200) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

//

interface InitialStateType {
  coupons: List<Coupon>;
  couponDetail: Coupon;
  couponHistory: CouponHistory;
  isGettingCoupons: boolean;
  isGettingDetailCoupons: boolean;
  isGettingHistoryCoupon: boolean;
  isAddingCoupon: boolean;
  isUpdatingCoupon: boolean;
  isDeletingCoupon: boolean;
}

const initialState: InitialStateType = {
  coupons: {
    data: [],
    limit: 5,
    page: 1,
    total: 0,
  },
  couponDetail: DEFAULT_COUPON,
  couponHistory: {
    coupon: {
      _id: "",
      name: "",
      code: "",
    },
    orders: {
      total: 0,
      page: 0,
      limit: 0,
      data: [],
    },
  },
  isGettingHistoryCoupon: false,
  isGettingDetailCoupons: false,
  isGettingCoupons: false,
  isAddingCoupon: false,
  isUpdatingCoupon: false,
  isDeletingCoupon: false,
};

const couponSlice = createSlice({
  name: "couponSlice",
  initialState,
  reducers: {
    setIsGettingCoupons: (state, action) => {
      state.isGettingCoupons = action.payload.loading;
    },
    setCoupons: (state, action) => {
      state.isGettingCoupons = false;
      state.coupons = action.payload;
    },
    setIsGettingDetailCoupons: (state, action) => {
      state.isGettingDetailCoupons = action.payload.loading;
    },
    setCouponDetail: (state, action) => {
      state.isGettingDetailCoupons = false;
      state.couponDetail = action.payload;
    },
    setIsAddingCoupon: (state, action) => {
      state.isAddingCoupon = action.payload.loading;
    },
    setIsUpdatingCoupon: (state, action) => {
      state.isUpdatingCoupon = action.payload.loading;
    },
    setIsDeleteCoupon: (state, action) => {
      state.isDeletingCoupon = action.payload.loading;
    },
    setIsGettingHistoryCoupon: (state, action) => {
      state.isGettingHistoryCoupon = action.payload.loading;
    },
    setCouponHistory: (state, action) => {
      state.isGettingHistoryCoupon = false;
      state.couponHistory = action.payload;
    },
  },
  extraReducers: {
    // [getCoupons.pending.toString()]: (state) => {
    //   state.isGettingCoupons = true;
    // },
    // [getCoupons.rejected.toString()]: (state) => {
    //   state.isGettingCoupons = false;
    // },
    // [getCoupons.fulfilled.toString()]: (state, action: PayloadAction<List<Coupon>>) => {
    //   state.isGettingCoupons = false;
    //   state.coupons = action.payload;
    // },
    // [getDetailCoupon.pending.toString()]: (state) => {
    //   state.isGettingDetailCoupons = true;
    // },
    // [getDetailCoupon.rejected.toString()]: (state) => {
    //   state.isGettingDetailCoupons = false;
    // },
    // [getDetailCoupon.fulfilled.toString()]: (state, action: PayloadAction<Coupon>) => {
    //   state.isGettingDetailCoupons = false;
    //   state.couponDetail = action.payload;
    // },
    // [getHistoryCoupon.pending.toString()]: (state) => {
    //   state.isGettingHistoryCoupon = true;
    // },
    // [getHistoryCoupon.fulfilled.toString()]: (state, action: PayloadAction<CouponHistory>) => {
    //   state.couponHistory = action.payload;
    //   state.isGettingHistoryCoupon = false;
    // },
    // [addCoupon.pending.toString()]: (state) => {
    //   state.isAddingCoupon = true;
    // },
    // [addCoupon.rejected.toString()]: (state) => {
    //   state.isAddingCoupon = false;
    // },
    // [addCoupon.fulfilled.toString()]: (state) => {
    //   state.isAddingCoupon = false;
    // },
    // [updateCoupon.pending.toString()]: (state) => {
    //   state.isUpdatingCoupon = true;
    // },
    // [updateCoupon.rejected.toString()]: (state) => {
    //   state.isUpdatingCoupon = false;
    // },
    // [updateCoupon.fulfilled.toString()]: (state) => {
    //   state.isUpdatingCoupon = false;
    // },
    // [deleteCoupon.pending.toString()]: (state) => {
    //   state.isDeletingCoupon = true;
    // },
    // [deleteCoupon.rejected.toString()]: (state) => {
    //   state.isDeletingCoupon = false;
    // },
    // [deleteCoupon.fulfilled.toString()]: (state) => {
    //   state.isDeletingCoupon = false;
    // },
  },
});
export const {
  setIsGettingCoupons,
  setCoupons,
  setIsGettingDetailCoupons,
  setCouponDetail,
  setIsAddingCoupon,
  setIsUpdatingCoupon,
  setIsDeleteCoupon,
  setIsGettingHistoryCoupon,
  setCouponHistory,
} = couponSlice.actions;
export default couponSlice.reducer;
