import { createSlice } from "@reduxjs/toolkit";

import { ApiListModel } from "src/types/api-list.model";
import { OrderModel, TrackingStatusModel } from "src/types/order.model";

// export const getOrderList = createAsyncThunk(
//   "order/getOrderList",
//   async (params: ParamListRequestModel, { rejectWithValue }) => {
//     try {
//       const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/orders`, {
//         params,
//       })) as ApiListModel<OrderModel>;
//       if (response.error) return rejectWithValue(response.data);
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   },
// );

// export const getOrderDetail = createAsyncThunk("order/getOrderDetail", async (id: string) => {
//   try {
//     const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/orders/${id}`);
//     return response;
//   } catch (err) {
//     throw err;
//   }
// });

// export const getOrderTrackingDetail = createAsyncThunk(
//   "order/getOrderTrackingDetail",
//   async (id: string) => {
//     try {
//       const response = await authorizedRequest.get(
//         `${config.apiBaseUrl}/admin/orders/tracking-status/${id}`,
//       );
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   },
// );

interface OrderTrackingDetailModel {
  order: OrderModel;
  trackingStatus: TrackingStatusModel[];
}
interface InitialStateType {
  orderData?: ApiListModel<OrderModel>;
  orderDetail?: OrderModel;
  loading: boolean;
  loadingDetail: boolean;
  errorMessage: string;
}

const initialState: InitialStateType = {
  orderData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },


  errorMessage: "",
  loading: true,
  loadingDetail: true,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: () => {
      return initialState;
    },
    getOrderListPending: (state) => {
      state.loading = true;
    },
    getOrderListFulfilled: (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
    },
    getOrderListRejected: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    getOrderDetailPending: (state) => {
      state.loadingDetail = true;
    },
    getOrderDetailFulfilled: (state, action) => {
      state.loadingDetail = false;

      if (action.payload.statusCode === 404) {
        state.errorMessage = "404";
      } else if (action.payload.statusCode !== 400) {
        state.orderDetail = action.payload;
      }
    },
    getOrderDetailRejected: (state, action) => {
      state.loadingDetail = false;
      state.errorMessage = action.payload;
    },
    getOrderTrackingDetailFulfilled: (state, action) => {
      state.loadingDetail = false;
      // state.orderTrackingDetail = action.payload;
    },
  },
  extraReducers: {
    // get order list
    // [getOrderList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getOrderList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<OrderModel>>,
    // ) => {
    //   state.loading = false;
    //   state.orderData = action.payload;
    // },
    // [getOrderList.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.error.message;
    // },
    // get order detail
    // [getOrderDetail.pending.toString()]: (state) => {
    //   state.loadingDetail = true;
    // },
    // [getOrderDetail.fulfilled.toString()]: (state, action: PayloadAction<OrderModel>) => {
    //   state.loadingDetail = false;
    //   if (action.payload.statusCode === 404) {
    //     state.errorMessage = "404";
    //   } else if (action.payload.statusCode !== 400) {
    //     state.orderDetail = action.payload;
    //   }
    // },
    // [getOrderDetail.rejected.toString()]: (state, action) => {
    //   state.loadingDetail = false;
    //   state.errorMessage = action.error.message;
    // },
    // get order tracking detail
    // [getOrderTrackingDetail.pending.toString()]: (state) => {
    //   state.loadingDetail = true;
    // },
    // [getOrderTrackingDetail.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<OrderTrackingDetailModel>,
    // ) => {
    //   state.loadingDetail = false;
    //   state.orderTrackingDetail = action.payload;
    // },
    // [getOrderTrackingDetail.rejected.toString()]: (state, action) => {
    //   state.loadingDetail = false;
    // },
  },
});

export default ordersSlice.reducer;

export const {
  resetOrder,
  getOrderListPending,
  getOrderListFulfilled,
  getOrderListRejected,
  getOrderDetailFulfilled,
  getOrderDetailPending,
  getOrderDetailRejected,
  getOrderTrackingDetailFulfilled,
} = ordersSlice.actions;
