import { createSlice } from "@reduxjs/toolkit";

import { ApiListModel } from "src/types/api-list.model";
import { FAQCategoryDetail, FAQCategoryModel } from "src/types/faq-category.model";

// export const getFAQCategoryList = createAsyncThunk(
//   "FAQCategory/get FAQ category List",
//   async (params: ParamsListRequestFAQ, { rejectWithValue }) => {
//     try {
//       const response = (await authorizedRequest.get(
//         toQueryString(`${config.apiBaseUrl}/admin/faq-categories`, params),
//       )) as ApiListModel<InternalUserModel>;
//       if (response.error) return rejectWithValue(response.data);
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   },
// );
// export const deleteFAQCategory = createAsyncThunk(
//   "FAQCategory/deleteNewsArtCates",
//   async ({ id, onSuccess, onError }: CallbackResponse & { id: string }) => {
//     const res = await deleteFAQCategoryAPI(id);
//     if (res.status === 200) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );
// export const getFAQCategoryById = createAsyncThunk("faq/getFAQById", async (id: string) => {
//   const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/faq-categories/${id}`);
//   return response;
// });

interface InitialStateType {
  FAQCategoryData: FAQCategoryModel[];
  FAQCategoryDetail: FAQCategoryDetail;
  loading: boolean;
  errorMessage: string;
  isDeletingCates: boolean;
}

const initialState: InitialStateType = {
  FAQCategoryData: [],
  errorMessage: "",
  FAQCategoryDetail: {
    status: "",
    _id: "",
    name: "",
  },
  loading: true,
  isDeletingCates: false,
};

const FAQCategorySlice = createSlice({
  name: "FAQCategory",
  initialState,
  reducers: {
    resetFAQCategory: (state) => {
      state.FAQCategoryDetail = {
        status: "",
        _id: "",
        name: "",
      };
    },
    setLoadingCategory: (state, action) => {
      state.loading = action.payload.loading;
    },
    setFAQCategoryList: (state, action) => {
      state.loading = false;
      state.FAQCategoryData = action.payload;
    },
    setDetailCategoryFaq: (state, action) => {
      state.loading = false;
      state.FAQCategoryDetail = action.payload;
    },
    setLoadingDeletingCates: (state, action) => {
      state.isDeletingCates = action.payload.loading;
    },
  },
  extraReducers: {
    // [getFAQCategoryList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getFAQCategoryList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<FAQCategoryModel>>,
    // ) => {
    //   state.loading = false;
    //   state.FAQCategoryData = action.payload;
    // },
    // [getFAQCategoryList.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.error.message;
    // },
    // [getFAQCategoryById.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getFAQCategoryById.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<FAQCategoryDetail>,
    // ) => {
    //   state.loading = false;
    //   state.FAQCategoryDetail = action.payload;
    // },
    // [getFAQCategoryById.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [deleteFAQCategory.pending.toString()]: (state) => {
    //   state.isDeletingNewsArtCates = true;
    // },
    // [deleteFAQCategory.rejected.toString()]: (state) => {
    //   state.isDeletingNewsArtCates = false;
    // },
    // [deleteFAQCategory.fulfilled.toString()]: (state) => {
    //   state.isDeletingNewsArtCates = false;
    // },
  },
});

export const {
  resetFAQCategory,
  setLoadingCategory,
  setFAQCategoryList,
  setDetailCategoryFaq,
  setLoadingDeletingCates,
} = FAQCategorySlice.actions;

export default FAQCategorySlice.reducer;
