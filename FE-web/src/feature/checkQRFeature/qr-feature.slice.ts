import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CheckQRStatus {
  status: boolean;
}

interface InitialStateType {
  status: boolean;
}

const initialState: InitialStateType = {
  status: false,
};

export const statusQRFeatureSlice = createSlice({
  name: "status-qr",
  initialState,
  reducers: {
    getStatusQRFeaturePending: (state) => {
      state.status = false;
    },
    getStatusQRFeatureFulfilled: (state, action: PayloadAction<CheckQRStatus>) => {
      state.status = action.payload.status;
    },
    getStatusQRFeatureRejected: (state) => {
      state.status = false;
    },
  },
  extraReducers: {
    // [getStatusQRFeature.pending.toString()]: (state) => {
    //   state.status = false;
    // },
    // [getStatusQRFeature.fulfilled.toString()]: (state, action: PayloadAction<CheckQRStatus>) => {
    //   state.status = action.payload.status;
    // },
    // [getStatusQRFeature.rejected.toString()]: (state) => {
    //   state.status = false;
    // },
  },
});

export const {
  getStatusQRFeatureFulfilled,
  getStatusQRFeaturePending,
  getStatusQRFeatureRejected,
} = statusQRFeatureSlice.actions;
export default statusQRFeatureSlice.reducer;
