import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiListModel, SponsorAnalysisModel } from "./type";

interface SponsorAnalysisState {
  sponsorAnalysis: ApiListModel<SponsorAnalysisModel>;
  loading: boolean;
}

const initialState: SponsorAnalysisState = {
  sponsorAnalysis: {
    data: [],
    totalPage: 0,
    currentPage: 0,
    pageLimit: 0,
    totalDocs: 0,
  },
  loading: false,
};

export const sponsorAnalysisSlice = createSlice({
  name: "direct-sponsor-analysis",
  initialState,
  reducers: {
    getDirectSponsorAnalysisPending: (state) => {
      state.loading = true;
    },
    getDirectSponsorAnalysisReject: (state) => {
      state.loading = false;
    },
    getDirectSponsorAnalysisFulfilled: (
      state,
      action: PayloadAction<ApiListModel<SponsorAnalysisModel>>,
    ) => {
      state.sponsorAnalysis = action.payload;
      state.loading = false;
    },
  },
  extraReducers: {},
});
export const {
  getDirectSponsorAnalysisPending,
  getDirectSponsorAnalysisReject,
  getDirectSponsorAnalysisFulfilled,
} = sponsorAnalysisSlice.actions;
export default sponsorAnalysisSlice.reducer;
