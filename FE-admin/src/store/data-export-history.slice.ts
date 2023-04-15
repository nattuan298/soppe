import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { DataExportModel } from "src/types/flatform.model";

// export const getDataExportHistoryList = createAsyncThunk(
//   "data export history/ get list",
//   async (params: ParamListRequestModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/data-export-history`, {
//       params,
//     })) as ApiListModel<DataExportModel>;
//     return response;
//   },
// );
interface InitialStateType {
  DataExportHistoryData: ApiListModel<DataExportModel>;
  loading: boolean;
  errorMessage: string;
}
const initialState: InitialStateType = {
  DataExportHistoryData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: true,
  errorMessage: "",
};

const dataExportHistorySlice = createSlice({
  name: "data export history",
  initialState,
  reducers: {
    dataExportHistoryListPending: (state) => {
      state.loading = true;
    },
    dataExportHistoryListFulfilled: (state, action) => {
      state.loading = false;
      state.DataExportHistoryData = action.payload;
    },
    getDataExportHistoryListRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getDataExportHistoryList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getDataExportHistoryList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<DataExportModel>>,
    // ) => {
    //   state.loading = false;
    //   state.DataExportHistoryData = action.payload;
    // },
    // [getDataExportHistoryList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  dataExportHistoryListFulfilled,
  dataExportHistoryListPending,
  getDataExportHistoryListRejected,
} = dataExportHistorySlice.actions;

export default dataExportHistorySlice.reducer;
