import { createSlice } from "@reduxjs/toolkit";
import { ApiListModel } from "src/types/api-list.model";
import { TempateHomeBodyModel, TemplateHomeModel } from "src/types/home-template.model";
// import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";

// export const getHomeTemplateList = createAsyncThunk(
//   "hometemplate/hometemplate-list",
//   async (params: ParamListRequestBannerLoopModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/home-templates`, {
//       params,
//     })) as ApiListModel<TemplateHomeModel>;
//     return response;
//   },
// );

// export const getHomeTemplateSelected = createAsyncThunk(
//   "hometemplate/hometemplate-select",
//   async (id: string) => {
//     const response = (await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/home-templates/${id}`,
//     )) as TempateHomeBodyModel;
//     return response;
//   },
// );

interface InitialStateType {
  hometemplates: ApiListModel<TemplateHomeModel>;
  hometemplateSelect: TempateHomeBodyModel | null;
  loading: boolean;
}

const initialState: InitialStateType = {
  hometemplates: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  hometemplateSelect: null,
  loading: true,
};

const internalHomeTemplate = createSlice({
  name: "internalBannerSlice",
  initialState,
  reducers: {
    clearSelectedHomeTemplate: (state) => {
      state.hometemplateSelect = null;
    },
    homeTemplatePending: (state) => {
      state.loading = true;
    },
    homeTemplateRejected: (state) => {
      state.loading = false;
    },
    homeTemplateList: (state, action) => {
      state.loading = false;
      state.hometemplates = action.payload;
    },
    homeTemplateSelected: (state, action) => {
      state.loading = false;
      state.hometemplateSelect = action.payload;
    },
  },
  extraReducers: {
    // [getHomeTemplateList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getHomeTemplateList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<TemplateHomeModel>>,
    // ) => {
    //   state.loading = false;
    //   state.hometemplates = action.payload;
    // },
    // [getHomeTemplateList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getHomeTemplateList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getHomeTemplateSelected.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getHomeTemplateSelected.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<TemplateHomeModel>,
    // ) => {
    //   state.loading = false;
    //   state.hometemplateSelect = action.payload;
    // },
    // [getHomeTemplateSelected.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  clearSelectedHomeTemplate,
  homeTemplateList,
  homeTemplatePending,
  homeTemplateRejected,
  homeTemplateSelected,
} = internalHomeTemplate.actions;

export default internalHomeTemplate.reducer;
