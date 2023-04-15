import { createSlice } from "@reduxjs/toolkit";

import { ReviewModel } from "src/types/review.model";
import { ApiListModel } from "src/types/api-list.model";

interface InitialStateType {
  ReviewData: ApiListModel<ReviewModel>;
  loading: boolean;
  errorMessage: string;
}
const initialState: InitialStateType = {
  ReviewData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: true,
  errorMessage: "",
};
const ReviewSlice = createSlice({
  name: "FAQ",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setListReview: (state, action) => {
      state.loading = false;
      if (action.payload.statusCode === 403) {
        return state;
      }
      state.ReviewData = action.payload;
    },
  },
  extraReducers: {
    // [getReviewList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getReviewList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<ReviewModel>>,
    // ) => {
    //   state.loading = false;
    //   state.ReviewData = action.payload;
    // },
    // [getReviewList.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.error.message;
    // },
  },
});
export const { setLoading, setListReview } = ReviewSlice.actions;
export default ReviewSlice.reducer;
