import { createSlice } from "@reduxjs/toolkit";
import { ProductType, ProductsType } from "types/api-response-type";

interface initialStateType {
  loading: boolean;
  favoriteProductDetail: ProductsType;
}

const initialState: initialStateType = {
  loading: true,
  favoriteProductDetail: [],
};

export const favoriteProductSlice = createSlice({
  name: "favorite-product",
  initialState,
  reducers: {
    getFavoriteProductPending: (state) => {
      state.loading = true;
    },
    getFavoriteProductFulfilled: (state, action) => {
      state.loading = false;
      state.favoriteProductDetail = action.payload;
    },
    getFavoriteProductReject: (state) => {
      state.loading = false;
    },
    deleteFavoriteFulfilled: (state, action) => {
      state.loading = false;
      const index = state.favoriteProductDetail.findIndex(
        (product: ProductType) => product._id === action.payload,
      );
      state.favoriteProductDetail.splice(index, 1);
    },
    deleteFavoriteProductReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  deleteFavoriteProductReject,
  getFavoriteProductPending,
  deleteFavoriteFulfilled,
  getFavoriteProductReject,
  getFavoriteProductFulfilled,
} = favoriteProductSlice.actions;
