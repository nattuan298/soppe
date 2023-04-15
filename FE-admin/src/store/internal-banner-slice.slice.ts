import { createSlice } from "@reduxjs/toolkit";

// import { config } from "src/constants/config";
// import { authorizedRequest } from "src/lib/request";
import { InternalBannerSectionModel } from "src/types/internal-banner-loop.model";
import { ApiListModel } from "src/types/api-list.model";
// import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { ActiveSection } from "src/types/active-section.model";

// export const getInternalBannerSliceList = createAsyncThunk(
//   "internalBannerSlice/internalBannerSliceList",
//   async (params: ParamListRequestBannerLoopModel) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/banner-section-loops`,
//       {
//         params,
//       },
//     )) as ApiListModel<InternalBannerSectionModel>;
//     return response;
//   },
// );

// export const getBannerSectionActiveList = createAsyncThunk(
//   "internalBannerSlice/internalActiveBannerSectionLoop",
//   async () => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/banner-section-loops/active`,
//     )) as Array<ActiveSection>;
//     return response;
//   },
// );

interface InitialStateType {
  internalBannerSliceData: ApiListModel<InternalBannerSectionModel>;
  bannerSectionActive: Array<ActiveSection>;
  loading: boolean;
}

const initialState: InitialStateType = {
  internalBannerSliceData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  bannerSectionActive: [],
  loading: true,
};

const internalBannerSlice = createSlice({
  name: "internalBannerSlice",
  initialState,
  reducers: {
    bannerSliceListPending: (state) => {
      state.loading = true;
    },
    bannerSliceListFulfilled: (state, action) => {
      state.loading = false;
      state.internalBannerSliceData = action.payload;
    },
    bannerSliceListRejected: (state) => {
      state.loading = false;
    },
    bannerSectionActiveListFulfilled: (state, action) => {
      state.bannerSectionActive = action.payload;
    },
  },
  extraReducers: {
    // [getInternalBannerSliceList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBannerSliceList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<InternalBannerSectionModel>>,
    // ) => {
    //   state.loading = false;
    //   state.internalBannerSliceData = action.payload;
    // },
    // [getInternalBannerSliceList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getBannerSectionActiveList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<[ActiveSection]>,
    // ) => {
    //   state.bannerSectionActive = action.payload;
    // },
  },
});

export const {
  bannerSliceListPending,
  bannerSliceListFulfilled,
  bannerSliceListRejected,
  bannerSectionActiveListFulfilled,
} = internalBannerSlice.actions;
export default internalBannerSlice.reducer;
