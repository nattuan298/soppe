import { createAction, createSlice } from "@reduxjs/toolkit";

export interface ForgotType {
  statusSendCode: string,
  status:string,
  errrorMessageCode:string,
  errrorMessage:string,
  loadingSendEmail: boolean,
  loadingSendCode: boolean,
}
const initialState:ForgotType = {
  statusSendCode: "",
  status: "",
  errrorMessage: "",
  errrorMessageCode: "",
  loadingSendEmail: false,
  loadingSendCode: false,
};
export const handleChangeField = createAction<Partial<ForgotType>>(
  "forgotPassword/handleChangeField",
);
export const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    resetForgot: (state) => {
      state.status = "";
      state.errrorMessage = "";
      state.loadingSendEmail = false;
    },
    forgotPending: (state) => {
      state.status = "loading";
      state.loadingSendEmail = true;
      return state;
    },
    forgotFulfilled: (state) => {
      state.status = "success";
      state.loadingSendEmail = false;
      return state;
    },
    forgotRejected: (state, { payload }) => {
      state.status = "failed";
      state.loadingSendEmail = false;
      state.errrorMessage = payload.message;
      return state;
    },
    recoverPending: (state) => {
      state.statusSendCode = "loading";
      state.loadingSendCode = true;
      return state;
    },
    recoverFulfilled: (state) => {
      state.statusSendCode = "success";
      state.loadingSendCode = false;
      return state;
    },
    recoverRejected: (state, { payload }) => {
      state.statusSendCode = "failed";
      state.loadingSendCode = false;
      state.errrorMessageCode = payload.message;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleChangeField, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});
export const {
  forgotPending,
  forgotFulfilled,
  forgotRejected,
  resetForgot,
  recoverPending,
  recoverFulfilled,
  recoverRejected,
} = forgotSlice.actions;
