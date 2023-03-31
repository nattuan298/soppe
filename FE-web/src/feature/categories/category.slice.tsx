import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "./types";

interface InitialStateType {
  categories: CategoryModel[];
  loading: boolean;
}

const initialState: InitialStateType = {
  categories: [],
  loading: true,
};

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategoriesPending: (state) => {
      state.loading = true;
    },
    getCategoriesFulfilled: (state, action: PayloadAction<CategoryModel[]>) => {
      state.loading = false;
      state.categories = action.payload;
    },
    getCategoriesReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getCategories.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getCategories.fulfilled.toString()]: (state, action: PayloadAction<CategoryModel[]>) => {
    //   state.loading = false;
    //   state.categories = action.payload;
    // },
    // [getCategories.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { getCategoriesPending, getCategoriesFulfilled, getCategoriesReject } =
  CategoriesSlice.actions;
