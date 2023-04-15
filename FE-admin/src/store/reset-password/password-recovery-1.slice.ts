import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  loading: boolean;
  statusCode: number;
  status: string;
}

const initialState: InitialStateType = {
  loading: true,
  statusCode: 0,
  status: "",
};

export const sendOtpSlice = createSlice({
  name: "sendOtp",
  initialState,
  reducers: {
    deleteStatusCode: (state) => {
      state.statusCode = 0;
    },
    sendOtpPending: (state) => {
      state.loading = true;
      state.status = "loading";
    },
    sendOtpFulfilled: (state, action) => {
      state.status = "success";
      state.statusCode = 204;
      state.loading = false;
      if (action.payload.statusCode === 400) {
        state.statusCode = 400;
      }
    },
    sendOtpRejected: (state) => {
      state.loading = false;
      state.status = "failed";
    },
  },
  extraReducers: {},
});

export const { deleteStatusCode, sendOtpFulfilled, sendOtpPending, sendOtpRejected } =
  sendOtpSlice.actions;
