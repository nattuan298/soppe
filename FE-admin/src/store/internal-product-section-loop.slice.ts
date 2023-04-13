import { createSlice } from "@reduxjs/toolkit";

import { ApiListModel } from "src/types/api-list.model";
import { InternalProductSectionLoopModel } from "src/types/internal-product-section-loop.model";
import { ActiveSection } from "src/types/active-section.model";

// export const getInternalProductSectionLoop = createAsyncThunk(
//   "internalProductSectionLoop/internalProductSectionLoops",
//   async (params: ParamListRequestBannerLoopModel) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/product-section-loops`,
//       {
//         params,
//       },
//     )) as ApiListModel<InternalProductSectionLoopModel>;
//     return response;
//   },
// );

// export const getSelectedProductSectionLoop = createAsyncThunk(
//   "internalProductSectionLoop/internalProductSectionLoop",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/product-section-loops/${id}`,
//     )) as InternalProductSectionLoopModel;
//     return response;
//   },
// );

// export const getProductSectionActiveList = createAsyncThunk(
//   "internalProductSectionLoop/internalActiveProductSectionLoop",
//   async (countryCode: string) => {
//     const params = { countryCode };
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/product-section-loops/active`,
//       { params },
//     )) as Array<ActiveSection>;
//     return response;
//   },
// );

interface InitialStateType {
  productSectionLoops: ApiListModel<InternalProductSectionLoopModel>;
  selectedSectionLoops: InternalProductSectionLoopModel | null;
  productSectionActive: Array<ActiveSection>;
  loading: boolean;
}

const initialState: InitialStateType = {
  productSectionLoops: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  selectedSectionLoops: null,
  productSectionActive: [],
  loading: true,
};

const internalProductSectionLoopSlice = createSlice({
  name: "internalProductSectionLoop",
  initialState,
  reducers: {
    clearSelectedProductSectionLoop: (state) => {
      state.selectedSectionLoops = null;
    },
    productSectionLoopPending: (state) => {
      state.loading = true;
    },
    productSectionLoopRejected: (state) => {
      state.loading = false;
    },
    productSectionLoopListFulfilled: (state, action) => {
      state.loading = false;
      state.productSectionLoops = action.payload;
    },
    productSectionLoopSelectedFulfilled: (state, action) => {
      state.loading = false;
      state.selectedSectionLoops = action.payload;
    },
    productSectionActiveListFulfilled: (state, action) => {
      state.productSectionActive = action.payload;
    },
  },
  extraReducers: {
    // [getInternalProductSectionLoop.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalProductSectionLoop.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<InternalProductSectionLoopModel>>,
    // ) => {
    //   state.loading = false;
    //   state.productSectionLoops = action.payload;
    // },
    // [getInternalProductSectionLoop.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getSelectedProductSectionLoop.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getSelectedProductSectionLoop.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<InternalProductSectionLoopModel>,
    // ) => {
    //   state.loading = false;
    //   state.selectedSectionLoops = action.payload;
    // },
    // [getSelectedProductSectionLoop.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getProductSectionActiveList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<[ActiveSection]>,
    // ) => {
    //   state.productSectionActive = action.payload;
    // },
  },
});

export const {
  clearSelectedProductSectionLoop,
  productSectionActiveListFulfilled,
  productSectionLoopPending,
  productSectionLoopListFulfilled,
  productSectionLoopRejected,
  productSectionLoopSelectedFulfilled,
} = internalProductSectionLoopSlice.actions;

export default internalProductSectionLoopSlice.reducer;
