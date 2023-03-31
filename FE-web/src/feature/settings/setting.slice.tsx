import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModelNotify } from "./setting.type";

interface InitialStateType {
  NotifyData: {
    notifyStatus: boolean;
    _id: string;
  };
  loading: boolean;
  errorMessage: string;
  loadingSignOut: boolean;
  loadingButtonSignOut: boolean;
}
const initialState: InitialStateType = {
  NotifyData: {
    notifyStatus: false,
    _id: "",
  },
  loading: true,
  errorMessage: "",
  loadingSignOut: true,
  loadingButtonSignOut: false,
};
export const SettingSlice = createSlice({
  name: "FAQ",
  initialState,
  reducers: {
    getNotificationPending: (state) => {
      state.loading = true;
    },
    getNotificationReject: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },
    getNotificationFulfilled: (state, action: PayloadAction<ModelNotify>) => {
      state.loading = false;
      state.NotifyData = action.payload;
    },
    resetLoadingSignOut: (state) => {
      state.loadingSignOut = true;
    },
    signOutAPIPending: (state) => {
      state.loadingSignOut = true;
      state.loadingButtonSignOut = true;
    },
    signOutAPIfulfilled: (state) => {
      state.loadingSignOut = false;
      state.loadingButtonSignOut = false;
    },
    signOutAPIReject: (state, action) => {
      state.loadingSignOut = true;
      state.errorMessage = action.payload.message;
      state.loadingButtonSignOut = false;
    },
  },
  extraReducers: {
    // [getNotification.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getNotification.fulfilled.toString()]: (state, action: PayloadAction<ModelNotify>) => {
    //   state.loading = false;
    //   state.NotifyData = action.payload;
    // },
    // [getNotification.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload.message;
    // },
    // [signOutAPI.pending.toString()]: (state) => {
    //   state.loadingSignOut = true;
    //   state.loadingButtonSignOut = true;
    // },
    // [signOutAPI.fulfilled.toString()]: (state) => {
    //   state.loadingSignOut = false;
    //   state.loadingButtonSignOut = false;
    // },
    // [signOutAPI.rejected.toString()]: (state, action) => {
    //   state.loadingSignOut = true;
    //   state.errorMessage = action.payload.message;
    //   state.loadingButtonSignOut = false;
    // },
  },
});
export const {
  resetLoadingSignOut,
  getNotificationPending,
  getNotificationReject,
  getNotificationFulfilled,
  signOutAPIfulfilled,
  signOutAPIReject,
  signOutAPIPending,
} = SettingSlice.actions;
