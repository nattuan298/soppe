import { createSlice } from "@reduxjs/toolkit";
// import { ParamListRequestModel } from "src/types/params-list-request.model";
// import { authorizedRequest } from "src/lib/request";
// import { config } from "src/constants/config";
import { DashBoardModel } from "src/types/dashboard.model";

// export const getHomeDashboard = createAsyncThunk(
//   "homeDashboard/getDataHomeDashboard",
//   async (params: ParamListRequestModel) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/users/home-dashboard`,
//       {
//         params,
//       },
//     )) as DashBoardModel;
//     return response;
//   },
// );

interface InitialStateType {
  loading: boolean;
  dashboard: DashBoardModel;
}

const initialState: InitialStateType = {
  loading: false,
  dashboard: {
    conversionRate: 0,
    dataSales: [],
    numberOrder: 0,
    numberUser: 0,
    totalSale: 0,
    totalTraction: 0,
    unit: "THB",
  },
};

const dashboardSlice = createSlice({
  name: "homeDashboard",
  initialState,
  reducers: {
    getHomeDashboardPending: (state) => {
      state.loading = true;
    },
    getHomeDashboardFulfilled: (state, action) => {
      state.loading = false;
      state.dashboard = action.payload;
    },
    getHomeDashboardRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getHomeDashboard.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getHomeDashboard.fulfilled.toString()]: (state, action: PayloadAction<DashBoardModel>) => {
    //   state.loading = false;
    //   state.dashboard = action.payload;
    // },
    // [getHomeDashboard.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { getHomeDashboardPending, getHomeDashboardFulfilled, getHomeDashboardRejected } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
