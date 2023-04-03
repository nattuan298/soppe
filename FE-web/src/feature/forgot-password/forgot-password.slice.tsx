import { createAction, createSlice } from "@reduxjs/toolkit";

export interface ForgotType {
  username:string,
  email:string,
  code:string,
  newPassword:string,
  status:string,
  errrorMessage:string,
  loadingSendEmail: boolean
}
const initialState:ForgotType = {
  username: "",
  email: "",
  code: "",
  newPassword: "",
  status: "",
  errrorMessage: "",
  loadingSendEmail: false,
};
export const handleChangeField = createAction<Partial<ForgotType>>(
  "forgotPassword/handleChangeField",
);
export const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    resetForgot: (state) => {
      state.username = "";
      state.email = "";
      state.code = "";
      state.newPassword = "";
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
} = forgotSlice.actions;
