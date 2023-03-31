import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExpiredMemberType } from "./types";

interface InitialStateType {
  expiredMember: ExpiredMemberType;
  loading: boolean;
}

const initialState: InitialStateType = {
  expiredMember: {
    total: 0,
    page: 0,
    limit: 0,
    data: [],
  },
  loading: true,
};

export const expiredMemberListSlice = createSlice({
  name: "expiredMemberList",
  initialState,
  reducers: {
    getExpiredMemberListPending: (state) => {
      state.loading = true;
    },
    getExpiredMemberListFulfiller: (state, action: PayloadAction<ExpiredMemberType>) => {
      state.loading = false;
      state.expiredMember = action.payload;
    },
    getExpiredMemberListReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getExpiredMemberList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getExpiredMemberList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ExpiredMemberType>,
    // ) => {
    //   state.loading = false;
    //   state.expiredMember = action.payload;
    // },
    // [getExpiredMemberList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  getExpiredMemberListPending,
  getExpiredMemberListFulfiller,
  getExpiredMemberListReject,
} = expiredMemberListSlice.actions;
