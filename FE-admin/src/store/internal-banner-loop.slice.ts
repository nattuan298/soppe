import { createSlice } from "@reduxjs/toolkit";

import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";
import { ApiListModel } from "src/types/api-list.model";

// export const getInternalBannerLoopList = createAsyncThunk(
//   "internalBannerLoop/internalBannerLoopList",
//   async (params: ParamListRequestBannerLoopModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banner-loops`, {
//       params,
//     })) as ApiListModel<InternalBannerLoopModel>;
//     return response;
//   },
// );

interface InitialStateType {
  internalBannerLoopData: ApiListModel<InternalBannerLoopModel>;
  loading: boolean;
}

const initialState: InitialStateType = {
  internalBannerLoopData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: true,
};

const internalBannerLoopSlice = createSlice({
  name: "internalBannerLoop",
  initialState,
  reducers: {
    bannerLoopListPending: (state) => {
      state.loading = true;
    },
    bannerLoopListFulfilled: (state, action) => {
      state.loading = false;
      state.internalBannerLoopData = action.payload;
    },
    bannerLoopListRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getInternalBannerLoopList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBannerLoopList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<InternalBannerLoopModel>>,
    // ) => {
    //   state.loading = false;
    //   state.internalBannerLoopData = action.payload;
    // },
    // [getInternalBannerLoopList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { bannerLoopListFulfilled, bannerLoopListPending, bannerLoopListRejected } =
  internalBannerLoopSlice.actions;

export default internalBannerLoopSlice.reducer;
