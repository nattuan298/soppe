import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FavoriteMemberModel } from "../favorite-member/types";
import { ApiListModel } from "./types";

// export const getSponsorChart = createAsyncThunk(
//   "analysis/sponsor-chart",
//   async (paramsURL: string) => {
//     const response = await axios.get(`${apiRoute.members.sponsorChart}${paramsURL}`);
//     return response.data as ApiListModel<FavoriteMemberModel>;
//   },
// );

interface SponsorChartState {
  sponsorChart: ApiListModel<FavoriteMemberModel>;
  loading: boolean;
}

const initialState: SponsorChartState = {
  sponsorChart: {
    data: [],
    currentPage: 0,
    pageLimit: 0,
    totalDocs: 0,
    totalPage: 0,
  },
  loading: false,
};

export const sponsorChartSlice = createSlice({
  name: "sponsor-chart",
  initialState,
  reducers: {
    changeFavoriteMember: (state, action: PayloadAction<string>) => {
      state.sponsorChart.data = state.sponsorChart.data.map((item) => {
        if (item.memberId === action.payload) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
    },
    getSponsorChartPending: (state) => {
      state.loading = true;
    },
    getSponsorChartFulfilled: (state, action) => {
      state.sponsorChart = action.payload;
      state.loading = false;
    },
    getSponsorChartRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getSponsorChart.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getSponsorChart.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<FavoriteMemberModel>>,
    // ) => {
    //   state.sponsorChart = action.payload;
    //   state.loading = false;
    // },
    // [getSponsorChart.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  changeFavoriteMember,
  getSponsorChartFulfilled,
  getSponsorChartPending,
  getSponsorChartRejected,
} = sponsorChartSlice.actions;
export default sponsorChartSlice.reducer;
