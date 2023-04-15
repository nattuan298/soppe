import { createSlice } from "@reduxjs/toolkit";

import { ApiListModel } from "src/types/api-list.model";
import { UserHistoryModel } from "src/types/flatform.model";

// export const getUserHistoryList = createAsyncThunk(
//   "user history/ get list",
//   async (params: ParamListRequestModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/user-access-history`, {
//       params,
//     })) as ApiListModel<UserHistoryModel>;
//     return response;
//   },
// );
interface InitialStateType {
  UserHistoryData: ApiListModel<UserHistoryModel>;
  loading: boolean;
  errorMessage: string;
}
const initialState: InitialStateType = {
  UserHistoryData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: true,
  errorMessage: "",
};

const userHistorySlice = createSlice({
  name: "user history",
  initialState,
  reducers: {
    userHistoryListPending: (state) => {
      state.loading = true;
    },
    userHistoryListFulfilled: (state, action) => {
      state.loading = false;
      state.UserHistoryData = action.payload;
    },
    userHistoryListRejected: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    // [getUserHistoryList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getUserHistoryList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<UserHistoryModel>>,
    // ) => {
    //   state.loading = false;
    //   state.UserHistoryData = action.payload;
    // },
    // [getUserHistoryList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { userHistoryListPending, userHistoryListFulfilled, userHistoryListRejected } =
  userHistorySlice.actions;
export default userHistorySlice.reducer;
