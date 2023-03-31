import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NearExpireMemberType } from "./types";

interface InitialStateType {
  nearExpiredMemberList: NearExpireMemberType;
  loading: boolean;
}

const initialState: InitialStateType = {
  nearExpiredMemberList: {
    total: 0,
    page: 0,
    limit: 0,
    data: [],
  },
  loading: true,
};

export const nearExpireMemberListSlice = createSlice({
  name: "nearExpireMemberList",
  initialState,
  reducers: {
    getNearExpireMemberListPending: (state) => {
      state.loading = true;
    },
    getNearExpireMemberListFulfilled: (state, action: PayloadAction<NearExpireMemberType>) => {
      state.loading = false;
      state.nearExpiredMemberList = action.payload;
    },
    getNearExpireMemberListReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  getNearExpireMemberListPending,
  getNearExpireMemberListFulfilled,
  getNearExpireMemberListReject,
} = nearExpireMemberListSlice.actions;
