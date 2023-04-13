import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { InternalUserHistoryModel } from "src/types/flatform.model";

// export const getInternalUserHistoryList = createAsyncThunk(
//   "user internal history/ get list",
//   async (params: ParamListRequestModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/internal-user-history`, {
//       params,
//     })) as ApiListModel<InternalUserHistoryModel>;
//     return response;
//   },
// );
interface InitialStateType {
  InternalUserHistoryData: ApiListModel<InternalUserHistoryModel>;
  loading: boolean;
  errorMessage: string;
}
const initialState: InitialStateType = {
  InternalUserHistoryData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: true,
  errorMessage: "",
};

const internalUserHistorySlice = createSlice({
  name: "user internal history",
  initialState,
  reducers: {
    internalUserHistoryListPending: (state) => {
      state.loading = true;
    },
    internalUserHistoryListFulfilled: (state, action) => {
      state.loading = false;
      state.InternalUserHistoryData = action.payload;
    },
    internalUserHistoryListRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getInternalUserHistoryList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getInternalUserHistoryList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<InternalUserHistoryModel>>,
    // ) => {
    //   state.loading = false;
    //   state.InternalUserHistoryData = action.payload;
    // },
    // [getInternalUserHistoryList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  internalUserHistoryListFulfilled,
  internalUserHistoryListPending,
  internalUserHistoryListRejected,
} = internalUserHistorySlice.actions;
export default internalUserHistorySlice.reducer;
