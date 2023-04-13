import { createSlice } from "@reduxjs/toolkit";

// import { config } from "src/constants/config";
// import { authorizedRequest } from "src/lib/request";
import { InternalBannerSectionModel } from "src/types/internal-banner-loop.model";

// export const getInternalBannerSectionLoop = createAsyncThunk(
//   "internalBannerSectionLoop/internalSelectedBannerSectionLoop",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/banner-section-loops/${id}`,
//     )) as InternalBannerSectionModel;
//     return response;
//   },
// );

interface InitialStateType {
  bannerSectionLoopData: InternalBannerSectionModel | null;
  loading: boolean;
}

const initialState: InitialStateType = {
  bannerSectionLoopData: null,
  loading: true,
};

const internalBannerSectionSlice = createSlice({
  name: "internalSelectBannerSectionLoop",
  initialState,
  reducers: {
    clearSelectBannerLoop: (state) => {
      state.bannerSectionLoopData = null;
    },
    bannerSectionLoopSelectedPending: (state) => {
      state.loading = true;
    },
    bannerSectionLoopSelectedRejected: (state) => {
      state.loading = true;
    },
    bannerSectionLoopSelectedFulfilled: (state, action) => {
      state.loading = false;
      state.bannerSectionLoopData = action.payload;
    },
  },
  extraReducers: {
    // [getInternalBannerSectionLoop.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBannerSectionLoop.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<InternalBannerSectionModel>,
    // ) => {
    //   state.loading = false;
    //   state.bannerSectionLoopData = action.payload;
    // },
    // [getInternalBannerSectionLoop.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  clearSelectBannerLoop,
  bannerSectionLoopSelectedFulfilled,
  bannerSectionLoopSelectedPending,
  bannerSectionLoopSelectedRejected,
} = internalBannerSectionSlice.actions;

export default internalBannerSectionSlice.reducer;
