import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Reviews = {
  status: number;
};
interface inintialStateType {
  loading: boolean;
  statusCode: number;
}

const initialState: inintialStateType = {
  loading: false,
  statusCode: 0,
};

export const productReviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetStatusCode: (state) => {
      state.statusCode = 0;
    },
    productReviewPostPending: (state) => {
      state.loading = false;
    },
    productReviewPostFulfilled: (state, action: PayloadAction<Reviews>) => {
      state.loading = true;
      if (action.payload.status === 201) {
        state.statusCode = 201;
      }
    },
    productReviewPostRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  resetStatusCode,
  productReviewPostFulfilled,
  productReviewPostPending,
  productReviewPostRejected,
} = productReviewSlice.actions;
