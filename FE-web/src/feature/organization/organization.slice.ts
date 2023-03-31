import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { apiRoute } from "src/constants/apiRoutes";
// import axios from "src/lib/client/request";
import { FavoriteMemberModel } from "../favorite-member/types";
import { ApiListModel, OrganizationTreeType } from "./types";

// export const getOrgniztionChart = createAsyncThunk(
//   "analysis/orgniztion-chart",
//   async (paramsURL: string) => {
//     const response = await axios.get(`${apiRoute.members.organizationList}${paramsURL}`);
//     return response.data as ApiListModel<FavoriteMemberModel>;
//   },
// );

// export const getOrgniztionTree = createAsyncThunk(
//   "analysis/orgniztion-tree",
//   async (paramsURL: string) => {
//     const response = await axios.get(`${apiRoute.members.organizationTree}${paramsURL}`);
//     return response.data as ApiListModel<FavoriteMemberModel>;
//   },
// );

interface FavoriteMemberState {
  organizationList: ApiListModel<FavoriteMemberModel>;
  organizationTree: OrganizationTreeType;
  loading: boolean;
  keyword: string;
}

const initialState: FavoriteMemberState = {
  organizationList: {
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  },
  organizationTree: {
    currentMatching: "",
    highestPosition: "",
    badgePosition: "",
    starPosition: "",
    applicationForm: "",
    copyOfSelfIDCard: "",
    bookBank: "",
    privatePVthisMoth: 0,
    pvLeft: 0,
    pvLeftThisMonth: 0,
    totalPVLeft: 0,
    bmcPVLeft: 0,
    starSup: 0,
    privatePVFirstSixtyDays: 0,
    pvRight: 0,
    pvRightThisMonth: 0,
    totalPVRight: 0,
    bmcPVRight: 0,
    startEx: 0,
    treeData: [],
  },
  keyword: "",
  loading: false,
};

export const organizationChartSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    changeFavoriteMember: (state, action: PayloadAction<string>) => {
      state.organizationList.data = state.organizationList.data.map((item) => {
        if (item.memberId === action.payload) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
      state.organizationTree.treeData = state.organizationTree.treeData.map((item) => {
        if (item.memberId === action.payload) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
    },
    updateKeyWord: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    getOrgniztionChartPending: (state) => {
      state.loading = true;
    },
    getOrgniztionChartFulfilled: (state, action) => {
      state.organizationList = action.payload;
      state.loading = false;
    },
    getOrgniztionChartRejected: (state) => {
      state.loading = false;
    },
    getOrgniztionTreeFulfilled: (state, action) => {
      state.organizationTree = action.payload;
      state.loading = false;
    },
  },

  extraReducers: {
    // [getOrgniztionChart.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getOrgniztionChart.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<FavoriteMemberModel>>,
    // ) => {
    //   state.organizationList = action.payload;
    //   state.loading = false;
    // },
    // [getOrgniztionChart.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getOrgniztionTree.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getOrgniztionTree.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<OrganizationTreeType>,
    // ) => {
    //   state.organizationTree = action.payload;
    //   state.loading = false;
    // },
    // [getOrgniztionTree.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  changeFavoriteMember,
  updateKeyWord,
  getOrgniztionChartFulfilled,
  getOrgniztionChartPending,
  getOrgniztionChartRejected,
  getOrgniztionTreeFulfilled,
} = organizationChartSlice.actions;
export default organizationChartSlice.reducer;
