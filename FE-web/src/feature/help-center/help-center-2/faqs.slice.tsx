import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FAQCategoriesModel, FAQs } from "../types";

interface initialStateType {
  faqCategory: FAQCategoriesModel;
  faqsData: FAQs;
  loading: boolean;
}

const initialState: initialStateType = {
  faqCategory: {
    _id: "",
    name: "",
  },
  faqsData: {
    faqCategory: {
      _id: "",
      name: "",
    },
    faqs: [],
  },
  loading: true,
};

const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    getFAQsPending: (state) => {
      state.loading = true;
    },
    getFAQsFulfilled: (state, action: PayloadAction<FAQs>) => {
      state.loading = false;
      state.faqsData = action.payload;
    },
    getFAQsRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const { getFAQsFulfilled, getFAQsPending, getFAQsRejected } = faqsSlice.actions;
export default faqsSlice.reducer;
