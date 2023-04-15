import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  loading: boolean;
  statusCode: number;
  jwtVerifyToken: string;
  status: string;
  message: string;
}

const initialState: InitialStateType = {
  loading: true,
  statusCode: 0,
  jwtVerifyToken: "",
  status: "",
  message: "",
};

export const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {
    deletejwtVerifyToken: (state) => {
      state.jwtVerifyToken = "";
    },
    verifyOtpPending: (state) => {
      state.loading = true;
      state.status = "loading";
      state.statusCode = 0;
      state.jwtVerifyToken = "";
      state.message = "";
    },
    verifyOtpFulfilled: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.statusCode = action.payload.statusCode;
      state.jwtVerifyToken = action.payload.jwtVerifyToken;
      state.message = action.payload.message;
    },
    verifyOtpRejected: (state) => {
      state.loading = false;
      state.status = "failed";
    },
  },
  extraReducers: {},
});

export const { deletejwtVerifyToken, verifyOtpFulfilled, verifyOtpPending, verifyOtpRejected } =
  verifyOtpSlice.actions;
