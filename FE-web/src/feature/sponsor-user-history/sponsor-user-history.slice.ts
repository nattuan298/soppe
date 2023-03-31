import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PayloadTest } from "./sponsor-user-history.type";
import { SponsorHistoryDetail } from "./types";

interface initialStateType {
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  sponsorHistoryDetail: SponsorHistoryDetail[];
}

const initialState: initialStateType = {
  loading: true,
  total: 0,
  page: 0,
  limit: 0,
  sponsorHistoryDetail: [],
};

export const sponsorHistorySlice = createSlice({
  name: "sponsorHistory",
  initialState,
  reducers: {
    resetSponsorHistoryDetail: (state) => {
      state.sponsorHistoryDetail = [];
    },
    resetSponsorHistoryPending: (state) => {
      state.loading = true;
    },
    resetSponsorHistoryFulfiller: (state, action: PayloadAction<PayloadTest>) => {
      state.loading = false;
      if (![0, 1].includes(action.payload.page)) {
        state.sponsorHistoryDetail = [...state.sponsorHistoryDetail, ...action.payload.data];
      } else {
        state.sponsorHistoryDetail = action.payload.data;
      }
      state.total = action.payload.total;
    },
    resetSponsorHistoryReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  resetSponsorHistoryDetail,
  resetSponsorHistoryPending,
  resetSponsorHistoryFulfiller,
  resetSponsorHistoryReject,
} = sponsorHistorySlice.actions;
