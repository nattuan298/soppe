import { createSlice } from "@reduxjs/toolkit";

import { ApiListProductsSections } from "src/types/api-list.model";
import { ProductSectionModel } from "src/types/internal-product-section-loop.model";

// export const getProductSection = createAsyncThunk(
//   "internalProductSection/internalProductSection",
//   async (params: ParamListRequestProductModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/products-sections`, {
//       params,
//     })) as ApiListProductsSections<ProductSectionModel>;
//     return response;
//   },
// );

interface InitialStateType {
  internalProductSection: ApiListProductsSections<ProductSectionModel>;
  loading: boolean;
}

const initialState: InitialStateType = {
  internalProductSection: {
    data: [],
    countryCode: "",
  },
  loading: false,
};

const internalProductSection = createSlice({
  name: "internalProductSection",
  initialState,
  reducers: {
    productSectionListingPending: (state) => {
      state.loading = true;
    },
    productSectionListingRejected: (state) => {
      state.loading = false;
    },
    productSectionListingFulfilled: (state, action) => {
      state.loading = false;
      state.internalProductSection = action.payload;
    },
  },
  extraReducers: {
    // [getProductSection.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getProductSection.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListProductsSections<ProductSectionModel>>,
    // ) => {
    //   state.loading = false;
    //   state.internalProductSection = action.payload;
    // },
    // [getProductSection.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  productSectionListingFulfilled,
  productSectionListingPending,
  productSectionListingRejected,
} = internalProductSection.actions;

export default internalProductSection.reducer;
