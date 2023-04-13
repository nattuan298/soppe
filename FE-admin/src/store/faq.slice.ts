import { createSlice } from "@reduxjs/toolkit";
import { ApiListModel } from "src/types/api-list.model";
import { CategoryFAQ, FAQDetailModel, FAQModel } from "src/types/faq.model";

// export const getFAQList = createAsyncThunk(
//   "faq/getFAQList",
//   async (params: ParamsListRequestFAQ, { rejectWithValue }) => {
//     try {
//       const response = (await authorizedRequest.get(
//         toQueryString(`${config.apiBaseUrl}/admin/faqs`, params),
//       )) as ApiListModel<InternalUserModel>;
//       if (response.error) return rejectWithValue(response.data);
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   },
// );

// export const getFAQById = createAsyncThunk("faq/getFAQById", async (id: string) => {
//   const response = await authorizedRequest.get(`${config.apiBaseUrl}/admin/faqs/${id}`);
//   return response;
// });
// export const getCategoryFAQList = createAsyncThunk("FAQManagement/getCategoryList", async () => {
//   const response = (await authorizedRequest.get(
//     `${config.apiBaseUrl}/faq-categories`,
//   )) as CategoryFAQ;
//   return response;
// });

interface InitialStateType {
  FAQData: ApiListModel<FAQModel>;
  FAQDetail: FAQDetailModel;
  categoryFAQData: CategoryFAQ[];
  loading: boolean;
  errorMessage: string;
  CanSwitch: boolean;
}

const initialState: InitialStateType = {
  FAQData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  categoryFAQData: [
    {
      _id: "",
      name: "",
    },
  ],
  errorMessage: "",
  FAQDetail: {
    _id: "",
    question: {
      en: "",
      th: "",
    },
    createdAt: "",
    publishStartDate: "",
    publishEndDate: "",
    status: "",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    category: "",
    answer: {
      en: "",
      th: "",
    },
    id: "",
  },
  loading: true,
  CanSwitch: true,
};

const FAQSlice = createSlice({
  name: "FAQ",
  initialState,
  reducers: {
    resetFAQ: (state) => {
      state.FAQDetail = {
        _id: "",
        question: {
          en: "",
          th: "",
        },
        createdAt: "",
        publishStartDate: "",
        publishEndDate: "",
        status: "",
        views: 0,
        helpful: 0,
        notHelpful: 0,
        category: "",
        answer: {
          en: "",
          th: "",
        },
        id: "",
      };
    },
    setCanSwitch: (state, action) => {
      state.CanSwitch = action.payload;
    },
    setLoadingFaq: (state, action) => {
      state.loading = action.payload.loading;
    },
    setFaqList: (state, action) => {
      state.loading = false;
      state.FAQData = action.payload;
    },
    setFaqDetail: (state, action) => {
      state.loading = false;
      state.FAQDetail = action.payload;
    },
    setCategoryFaq: (state, action) => {
      state.loading = false;
      state.categoryFAQData = action.payload;
    },
  },
  extraReducers: {
    // [getFAQList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getFAQList.fulfilled.toString()]: (state, action: PayloadAction<ApiListModel<FAQModel>>) => {
    //   state.loading = false;
    //   state.FAQData = action.payload;
    // },
    // [getFAQList.rejected.toString()]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.error.message;
    // },
    // [getFAQById.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getFAQById.fulfilled.toString()]: (state, action: PayloadAction<FAQDetailModel>) => {
    //   state.loading = false;
    //   state.FAQDetail = action.payload;
    // },
    // [getFAQById.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [getCategoryFAQList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getCategoryFAQList.fulfilled.toString()]: (state, action: PayloadAction<CategoryFAQ[]>) => {
    //   state.loading = false;
    //   state.categoryFAQData = action.payload;
    // },
    // [getCategoryFAQList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { resetFAQ, setCanSwitch, setLoadingFaq, setFaqList, setFaqDetail, setCategoryFaq } =
  FAQSlice.actions;

export default FAQSlice.reducer;
