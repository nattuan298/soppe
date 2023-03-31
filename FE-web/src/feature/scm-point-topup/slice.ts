import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { CheckoutState, topUpType } from "./type";

// export const makeOrderTopup = createAsyncThunk(
//   "PointTopup/makeOrder",
//   async ({ total }: { total: string }) => {
//     const bodyRequest = {
//       total: parseInt(total),
//     };
//     const response = await axios.post(`${apiRoute.pointTopup.makeOrder}`, bodyRequest);
//     return response;
//   },
// );

// export const totalSCMP = createAsyncThunk("PointTopup/total", async () => {
//   const response = await axios.get(`${apiRoute.pointTopup.totalSCMP}`);
//   return response;
// });

// export const getEcommission = createAsyncThunk("PointTopup/e-commission", async () => {
//   const response = await axios.get(`${apiRoute.pointTopup.Ecommission}`);
//   return response;
// });

// export const decreaseEcommission = createAsyncThunk(
//   "PointTopup/decrease-e-commission",
//   async ({ total }: { total: number }) => {
//     const bodyRequest = {
//       total,
//     };
//     const response = await axios.put(`${apiRoute.pointTopup.decreaseEcommission}`, bodyRequest);
//     return response;
//   },
// );

// export const getDetail = createAsyncThunk("PointTopup/detail", async ({ id }: { id: string }) => {
//   const response = await axios.get(`${apiRoute.pointTopup.detail}?orderId=${id}`);
//   return response;
// });

export const actionGetDataFromLocalStore = createAction<CheckoutState>(
  "PointTopup/actionGetDataFromLocalStore",
);
// export const paymentCheckoutPoint = createAsyncThunk(
//   "PointTopup/paymentCheckout",
//   async ({ token, data }: { token: string; data: CheckoutState }, { dispatch }) => {
//     if (data) {
//       const { total, OrderId } = data;
//       const res2 = await axios
//         .post(apiRoute.payment.normalCharge, {
//           amount: total,
//           currency: "THB",
//           description: "Checkout Payment",
//           source_type: "card",
//           mode: "token",
//           reference_order: OrderId,
//           token,
//           ref_1: "scm-point",
//         })
//         .catch((e) => {
//           return { data: { error: e.response.data.message } };
//         });

//       const { id, redirect_url, status, transaction_state, error } = res2.data;
//       error && dispatch(changeError(error));
//       if (status === "success" && !redirect_url && transaction_state === "Authorized") {
//         dispatch(changefieldStatus("success"));
//       }
//       dispatch(handleChangeField({ chargeId: id }));
//       if (redirect_url) {
//         const newWindow = window.open(
//           redirect_url,
//           "_blank",
//           "location=yes,height=600,width=1000,scrollbars=yes,status=yes,left=100,resizable=yes",
//         );
//         dispatch(changeOpenOTP(true));
//         const interval = setInterval(() => {
//           if (newWindow) {
//             if (newWindow.closed) {
//               dispatch(changeOpenOTP(false));
//               clearInterval(interval);
//             }
//           }
//         }, 3000);
//       }
//     }
//   },
// );
// export const handleChangeField = createAction<Partial<CheckoutState>>(
//   "PointTopup/handleChangeField",
// );

const initialState: topUpType = {
  totalSCMP: {
    data: {
      scmPoint: 0,
      productValueLeft: 0,
      productValueRight: 0,
      expireDate: "",
    },
  },
  errorMessage: "",
  total: 0,
  chargeId: "",
  OrderId: "",
  statusMakeOrder: "",
  statusMakePayment: "",
  paymentStatusForNonSecure: "",
  paymentMethod: "Credit/Debit",
  orderIdForQR: "",
  TotalEcommission: {
    data: 0,
  },
  orderDetail: {
    _id: "",
    total: 0,
    fullName: "",
    orderNumber: "",
  },
  openOTPPopup: false,
};

export const TopupPointSlice = createSlice({
  name: "PointTopup",
  initialState,
  reducers: {
    changeError: (state, action) => {
      state.errorMessage = action.payload;
    },
    changefieldStatus: (state, action) => {
      state.paymentStatusForNonSecure = action.payload;
    },
    changeOpenOTP: (state, action) => {
      state.openOTPPopup = action.payload;
    },
    changefieldOrderIdForQR: (state, action) => {
      state.orderIdForQR = action.payload;
    },
    resetStateCheckout: (state) => {
      state.OrderId = "";
      state.chargeId = "";
    },
    resetOrder: (state) => {
      state.OrderId = "";
      state.statusMakePayment = "";
      state.TotalEcommission = {
        data: 0,
      };
      state.orderDetail = {
        _id: "",
        total: 0,
        fullName: "",
        orderNumber: "",
      };
      state.paymentMethod = "";
    },
    setTotalpoint: (state, { payload }: PayloadAction<number>) => {
      state.total = payload;
    },
    handleChangeField: (state, action) => {
      state.chargeId = action.payload.chargeId;
    },
    totalSCMPFulfilled: (state, action) => {
      state.totalSCMP = action.payload;
    },
    getEcommissionFulfilled: (state, action) => {
      state.TotalEcommission = action.payload;
    },
    decreaseEcommissionFulfilled: (state, action) => {
      state.OrderId = action.payload.data;
      state.statusMakePayment = "success";
    },
    getDetailFulfilled: (state, action) => {
      state.orderDetail = action.payload.data;
    },
  },
  extraReducers: {
    // [makeOrderTopup.fulfilled.toString()]: (state, action: PayloadAction<{ data: string }>) => {
    //   state.OrderId = action.payload.data;
    //   state.statusMakeOrder = "success";
    // },
    // [totalSCMP.fulfilled.toString()]: (state, action: PayloadAction<totalPointModel>) => {
    //   state.totalSCMP = action.payload;
    // },
    // [getEcommission.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<totalEcommissionModel>,
    // ) => {
    //   state.TotalEcommission = action.payload;
    // },
    // [decreaseEcommission.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<{ data: string }>,
    // ) => {
    //   state.OrderId = action.payload.data;
    //   state.statusMakePayment = "success";
    // },
    // [getDetail.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<{ data: orderDetailModel }>,
    // ) => {
    //   state.orderDetail = action.payload.data;
    // },
    [actionGetDataFromLocalStore.toString()]: (_, { payload }) => {
      return payload;
    },
    // [handleChangeField.toString()]: (state, action) => {
    //   state.chargeId = action.payload.chargeId;
    //   // return (...state, ...action.payload);
    // },
  },
});

export const {
  resetOrder,
  setTotalpoint,
  changefieldStatus,
  resetStateCheckout,
  changeError,
  changefieldOrderIdForQR,
  changeOpenOTP,
  handleChangeField,
  totalSCMPFulfilled,
  getEcommissionFulfilled,
  decreaseEcommissionFulfilled,
  getDetailFulfilled,
} = TopupPointSlice.actions;
