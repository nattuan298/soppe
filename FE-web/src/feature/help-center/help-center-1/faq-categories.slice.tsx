import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FAQCategoriesModel } from "../types";

interface initialStateType {
  faqCategoriesData: FAQCategoriesModel[];
  loading: boolean;
}

const initialState: initialStateType = {
  faqCategoriesData: [{ _id: "", name: "" }],
  loading: true,
};

export const FAQCategoriesSlice = createSlice({
  name: "help-center",
  initialState,
  reducers: {
    getFAQCategoriesPending: (state) => {
      state.loading = true;
    },
    getFAQCategoriesFulfilled: (state, action: PayloadAction<FAQCategoriesModel[]>) => {
      state.loading = false;
      state.faqCategoriesData = action.payload;
    },
    getFAQCategoriesReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getFAQCategories.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getFAQCategories.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<FAQCategoriesModel[]>,
    // ) => {
    //   state.loading = false;
    //   state.faqCategoriesData = action.payload;
    // },
    // [getFAQCategories.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { getFAQCategoriesPending, getFAQCategoriesFulfilled, getFAQCategoriesReject } =
  FAQCategoriesSlice.actions;
