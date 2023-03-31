import { createSlice } from "@reduxjs/toolkit";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { FAQDetailModel } from "../types";

// export const getFAQDetail = createAsyncThunk(
//   "help-center/getFAQDetail",
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await axios.get(`${apiRoute.helpCenter.getfaqs}/${id}`);
//       if (response.status === 200) {
//         return response.data;
//       }
//       return thunkAPI.rejectWithValue(response.data);
//     } catch (error) {}
//   },
// );

// helpful
export const reviewHelpful = async (id: string | string[]) => {
  await axios.put(`${apiRoute.helpCenter.helpful}/${id}`);
};

// not helpful
export const reviewNotHelpful = async (id: string | string[]) => {
  await axios.put(`${apiRoute.helpCenter.notHelpful}/${id}`);
};

// interface initialStateHelpfulType {
//   loading: boolean;
// }

interface initialStateType {
  loading: boolean;
  faqDetailData: FAQDetailModel;
}

const initialState: initialStateType = {
  loading: true,
  faqDetailData: {
    views: 0,
    helpful: 0,
    _id: "",
    question: {
      en: "",
      th: "",
    },
    answer: {
      en: "",
      th: "",
    },
    publishStartDate: "",
    category: {
      _id: "",
    },
  },
};

// const initialStateHelpful: initialStateHelpfulType = {
//   loading: true,
// };

const faqDetailSlice = createSlice({
  name: "faqDetail",
  initialState,
  reducers: {
    getFAQDetailPending: (state) => {
      state.loading = true;
    },
    getFAQDetailFulfilled: (state, { payload }) => {
      state.loading = false;
      state.faqDetailData = payload;
    },
    getFAQDetailRejected: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    // [getFAQDetail.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getFAQDetail.fulfilled.toString()]: (state, { payload }) => {
    //   state.loading = false;
    //   state.faqDetailData = payload;
    // },
    // [getFAQDetail.rejected.toString()]: (state) => {
    //   state.loading = true;
    // },
  },
});

// export const reviewHelpfulSlice = createSlice({
//   name: "helpful",
//   initialState: initialStateHelpful,
//   reducers: {},
//   extraReducers: {
//     [reviewHelpful.pending.toString()]: (state) => {
//       state.loading = true;
//     },
//     [reviewHelpful.fulfilled.toString()]: (state) => {
//       state.loading = false;
//     },
//     [reviewHelpful.rejected.toString()]: (state) => {
//       state.loading = false;
//     },
//   },
// });

export const { getFAQDetailFulfilled, getFAQDetailPending, getFAQDetailRejected } =
  faqDetailSlice.actions;
export default faqDetailSlice.reducer;
