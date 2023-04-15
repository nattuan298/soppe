import { createSlice } from "@reduxjs/toolkit";

import { ApiListModel } from "src/types/api-list.model";
// import { config } from "src/constants/config";
// import { authorizedRequest } from "src/lib/request";
// import { ParamListRequestBanner } from "src/types/params-list-request.model";
import { InternalBannerModel, InternalBannerSectionModel } from "src/types/internal-banner.model";

// export const getInternalBanners = createAsyncThunk(
//   "internalBanner/internalBannerList",
//   async (params: ParamListRequestBanner) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banners`, {
//       params,
//     })) as ApiListModel<InternalBannerModel>;
//     return response;
//   },
// );

// export const getInternalBannerSections = createAsyncThunk(
//   "internalBannerSection/internalBannerSections",
//   async (params: ParamListRequestBanner) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/banner-sections`, {
//       params,
//     })) as ApiListModel<InternalBannerSectionModel>;
//     return response;
//   },
// );

// export const getInternalBanner = createAsyncThunk(
//   "internalBanner/internalSelectedBanner",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/banners/${id}`,
//     )) as InternalBannerModel;
//     return response;
//   },
// );

// export const getInternalBannerSection = createAsyncThunk(
//   "internalBanner/internalSelectedBannerSection",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/banner-sections/${id}`,
//     )) as InternalBannerModel;
//     return response;
//   },
// );

interface InitialStateType {
  internalBannerData: ApiListModel<InternalBannerModel | InternalBannerSectionModel>;
  selectedBanner: InternalBannerModel | InternalBannerSectionModel | null;
  loading: boolean;
}

const initialState: InitialStateType = {
  internalBannerData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  selectedBanner: null,
  loading: false,
};

const internalBannerSlice = createSlice({
  name: "internalBanner",
  initialState,
  reducers: {
    clearSelectBanner: (state) => {
      state.selectedBanner = null;
    },
    bannerSectionPending: (state) => {
      state.loading = true;
    },
    bannerSectionRejected: (state) => {
      state.loading = false;
    },
    bannerSectionListFulfilled: (state, action) => {
      state.loading = false;
      state.internalBannerData = {
        data: action.payload,
        total: action.payload.length,
        page: 1,
        limit: action.payload.length,
      };
    },
    bannerSectionSelectedFulfilled: (state, action) => {
      state.loading = false;
      state.selectedBanner = action.payload;
    },
  },
  extraReducers: {
    // [getInternalBanners.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBanners.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<Array<InternalBannerModel>>,
    // ) => {
    //   state.loading = false;
    //   state.internalBannerData = {
    //     data: action.payload,
    //     total: action.payload.length,
    //     page: 1,
    //     limit: action.payload.length,
    //   };
    // },
    // [getInternalBanners.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getInternalBannerSections.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBannerSections.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<Array<InternalBannerModel>>,
    // ) => {
    //   state.loading = false;
    //   state.internalBannerData = {
    //     data: action.payload,
    //     total: action.payload.length,
    //     page: 1,
    //     limit: action.payload.length,
    //   };
    // },
    // [getInternalBannerSections.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getInternalBanner.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBanner.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<InternalBannerModel>,
    // ) => {
    //   state.loading = false;
    //   state.selectedBanner = action.payload;
    // },
    // [getInternalBanner.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getInternalBannerSection.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalBannerSection.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<InternalBannerModel>,
    // ) => {
    //   state.loading = false;
    //   state.selectedBanner = action.payload;
    // },
    // [getInternalBannerSection.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  clearSelectBanner,
  bannerSectionListFulfilled,
  bannerSectionPending,
  bannerSectionRejected,
  bannerSectionSelectedFulfilled,
} = internalBannerSlice.actions;

export default internalBannerSlice.reducer;
