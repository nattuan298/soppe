import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiListModel } from "../direct-sponsor-analysis/type";
import { TravelPVHistoryType, TripType } from "./types";

interface initialType {
  travelPVHistory: ApiListModel<TravelPVHistoryType>;
  tripList: TripType[];
  loading: boolean;
}

const initialState: initialType = {
  travelPVHistory: {
    data: [],
    totalPage: 0,
    currentPage: 0,
    pageLimit: 0,
    totalDocs: 0,
  },
  tripList: [],
  loading: false,
};

export const travelPVHistorySlice = createSlice({
  name: "g1-analysis",
  initialState,
  reducers: {
    getTripPending: () => {},
    getTripFulfiller: (state, action: PayloadAction<TripType[]>) => {
      state.tripList = action.payload;
    },
    getTravelPVHistoryPending: (state) => {
      state.loading = true;
    },
    getTravelPVHistoryFulfilled: (
      state,
      action: PayloadAction<ApiListModel<TravelPVHistoryType>>,
    ) => {
      state.travelPVHistory = action.payload;
      state.loading = false;
    },
    getTravelPVHistoryReject: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export const {
  getTripPending,
  getTripFulfiller,
  getTravelPVHistoryFulfilled,
  getTravelPVHistoryReject,
  getTravelPVHistoryPending,
} = travelPVHistorySlice.actions;
export default travelPVHistorySlice.reducer;
