import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiListModelG1 } from "../direct-sponsor-analysis/type";
import { G1AnalysisModel } from "./type";

interface G1AnalysisState {
  g1Analysis: ApiListModelG1<G1AnalysisModel>;
  isGettingG1Analysis: boolean;
}

const initialState: G1AnalysisState = {
  g1Analysis: {
    docs: [],
    totalPage: 0,
    currentPage: 0,
    pageLimit: 0,
    totalDocs: 0,
  },
  isGettingG1Analysis: false,
};

export const g1AnalysisSlice = createSlice({
  name: "g1-analysis",
  initialState,
  reducers: {
    getG1AnalysisFulfilled: (state, action: PayloadAction<ApiListModelG1<G1AnalysisModel>>) => {
      state.g1Analysis = action.payload;
      state.isGettingG1Analysis = false;
    },
    getG1AnalysisPending: (state) => {
      state.isGettingG1Analysis = true;
    },
    getG1AnalysisReject: (state) => {
      state.isGettingG1Analysis = false;
    },
  },
  extraReducers: {},
});
export const { getG1AnalysisFulfilled, getG1AnalysisPending, getG1AnalysisReject } =
  g1AnalysisSlice.actions;
export default g1AnalysisSlice.reducer;
