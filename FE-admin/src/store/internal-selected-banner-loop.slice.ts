import { createSlice } from "@reduxjs/toolkit";

// import { config } from "src/constants/config";
// import { authorizedRequest } from "src/lib/request";
import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";

// export const getInternalBannerLoop = createAsyncThunk(
//   "internalBannerLoop/internalSelectedBannerLoop",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/banner-loops/${id}`,
//     )) as InternalBannerLoopModel;
//     return response;
//   },
// );

interface InitialStateType {
  bannerLoopData: InternalBannerLoopModel | null;
  loading: boolean;
}

const initialState: InitialStateType = {
  bannerLoopData: null,
  loading: true,
};

const internalBannerSlice = createSlice({
  name: "internalSelectBannerLoop",
  initialState,
  reducers: {
    clearSelectBannerLoop: (state) => {
      state.bannerLoopData = null;
    },
    selectedBannerLoopPending: (state) => {
      state.loading = true;
    },
    selectedBannerLoopFulfilled: (state, action) => {
      state.loading = false;
      state.bannerLoopData = action.payload;
    },
    selectedBannerLoopRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getInternalBannerLoop.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBannerLoop.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<InternalBannerLoopModel>,
    // ) => {
    //   state.loading = false;
    //   state.bannerLoopData = action.payload;
    // },
    // [getInternalBannerLoop.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  clearSelectBannerLoop,
  selectedBannerLoopFulfilled,
  selectedBannerLoopPending,
  selectedBannerLoopRejected,
} = internalBannerSlice.actions;

export default internalBannerSlice.reducer;
