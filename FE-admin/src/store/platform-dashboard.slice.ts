import { createSlice } from "@reduxjs/toolkit";
import { DashBoardPlatFormModel } from "src/types/dashboard.model";
import { ApiListModel } from "src/types/api-list.model";
import { NotificationModel } from "src/types/notification.model";

// export const getPlatformDashboard = createAsyncThunk(
//   "platform-home/getDataDashboard",
//   async (params: ParamListRequestDashBoard) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/users/home-platform`,
//       { params },
//     )) as DashBoardPlatFormModel;
//     return response;
//   },
// );

// export const getReportIssues = createAsyncThunk(
//   "platform-home/getReportIssues",
//   async (params: ParamListRequestModel) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/notification-management`,
//       {
//         params,
//       },
//     )) as ApiListModel<NotificationModel>;
//     return response;
//   },
// );

interface InitialStateType {
  loading: boolean;
  loadingIssues: boolean;
  tractions: DashBoardPlatFormModel;
  issuesReport: ApiListModel<NotificationModel>;
}

const initialState: InitialStateType = {
  loading: false,
  loadingIssues: false,
  tractions: {
    dataPlatform: {
      desktop: 0,
      mobile: 0,
    },
    tractionChart: [],
    totalTraction: 0,
  },
  issuesReport: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
};

const platformDashboardSlice = createSlice({
  name: "homeDashboard",
  initialState,
  reducers: {
    getPlatformDashboardPending: (state) => {
      state.loading = true;
    },
    getPlatformDashboardFulfilled: (state, action) => {
      state.loading = false;
      state.tractions = action.payload;
    },
    getPlatformDashboardRejected: (state) => {
      state.loading = false;
    },
    getReportIssuesPending: (state) => {
      state.loadingIssues = true;
    },
    getReportIssuesFulfilled: (state, action) => {
      state.loadingIssues = false;
      state.issuesReport = action.payload;
    },
    getReportIssuesRejected: (state) => {
      state.loadingIssues = false;
    },
  },
  extraReducers: {
    // [getPlatformDashboard.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getPlatformDashboard.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
    //   state.loading = false;
    //   state.tractions = action.payload;
    // },
    // [getPlatformDashboard.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getReportIssues.pending.toString()]: (state) => {
    //   state.loadingIssues = true;
    // },
    // [getReportIssues.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
    //   state.loadingIssues = false;
    //   state.issuesReport = action.payload;
    // },
    // [getReportIssues.rejected.toString()]: (state) => {
    //   state.loadingIssues = false;
    // },
  },
});

export const {
  getPlatformDashboardFulfilled,
  getPlatformDashboardPending,
  getPlatformDashboardRejected,
  getReportIssuesFulfilled,
  getReportIssuesPending,
  getReportIssuesRejected,
} = platformDashboardSlice.actions;

export default platformDashboardSlice.reducer;
