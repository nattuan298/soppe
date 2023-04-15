import { createSlice } from "@reduxjs/toolkit";

import { List } from "src/types/common.modal";
import { ArticleCategory } from "src/types/news-article.model";

// export const getNewsArticleCates = createAsyncThunk(
//   "newsArticleCats/getNewsArticleCates",
//   async (params: SearchParams) => {
//     const res = await getNewsArticleCateService(params);
//     return res.data;
//   },
// );

// export const getAllNewsArticleCates = createAsyncThunk(
//   "newsArticleCats/getAllNewsArticleCates",
//   async () => {
//     const res = await getAllNewsArticleCateService();
//     if (res.status === 200) return res.data;
//     return [];
//   },
// );

// export const addNewsArtCates = createAsyncThunk(
//   "newsArticleCats/addNewsArtCates",
//   async ({ name, onSuccess, onError }: CallbackResponse & { name: string }) => {
//     const res = await addNewsArticleCateService(name);
//     if (res.status === 201) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

// export const updateNewsArtCates = createAsyncThunk(
//   "newsArticleCats/updateNewsArtCates",
//   async ({ id, name, onSuccess, onError }: CallbackResponse & { id: string; name: string }) => {
//     const res = await updateNewsArticleCateService(id, name);
//     if (res.status === 200) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

// export const deleteNewsArtCates = createAsyncThunk(
//   "newsArticleCats/deleteNewsArtCates",
//   async ({ id, onSuccess, onError }: CallbackResponse & { id: string }) => {
//     const res = await deleteNewsArticleCateService(id);
//     if (res.status === 200) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

interface InitialStateType {
  newsArticleCates: List<ArticleCategory>;
  allNewsArticleCates: ArticleCategory[];
  isGettingNewsArtCates: boolean;
  isAddingNewsArtCates: boolean;
  isUpdaingNewsArtCates: boolean;
  isDeletingNewsArtCates: boolean;
}

const initialState: InitialStateType = {
  newsArticleCates: {
    data: [],
    limit: 5,
    page: 1,
    total: 0,
  },
  allNewsArticleCates: [],
  isGettingNewsArtCates: false,
  isAddingNewsArtCates: false,
  isUpdaingNewsArtCates: false,
  isDeletingNewsArtCates: false,
};

const newsArtCatesSlice = createSlice({
  name: "newsArtCatesSlice",
  initialState,
  reducers: {
    setIsGettingNewsArtCates: (state, action) => {
      state.isGettingNewsArtCates = action.payload.loading;
    },
    setNewsArticleCates: (state, action) => {
      state.isGettingNewsArtCates = false;
      state.newsArticleCates = action.payload;
    },
    setAllNewsArticleCates: (state, action) => {
      state.allNewsArticleCates = action.payload;
    },
    setStatusAddNews: (state, action) => {
      state.isAddingNewsArtCates = action.payload.loading;
    },
    setStatusUpdateNews: (state, action) => {
      state.isUpdaingNewsArtCates = action.payload.loading;
    },
    setDeleteNews: (state, action) => {
      state.isDeletingNewsArtCates = action.payload.loading;
    },
  },
  extraReducers: {
    // [getNewsArticleCates.pending.toString()]: (state) => {
    //   state.isGettingNewsArtCates = true;
    // },
    // [getNewsArticleCates.rejected.toString()]: (state, action) => {
    //   state.isGettingNewsArtCates = false;
    // },
    // [getNewsArticleCates.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<List<ArticleCategory>>,
    // ) => {
    //   state.isGettingNewsArtCates = false;
    //   state.newsArticleCates = action.payload;
    // },
    // [getAllNewsArticleCates.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ArticleCategory[]>,
    // ) => {
    //   state.allNewsArticleCates = action.payload;
    // },
    // [addNewsArtCates.pending.toString()]: (state) => {
    //   state.isAddingNewsArtCates = true;
    // },
    // [addNewsArtCates.rejected.toString()]: (state) => {
    //   state.isAddingNewsArtCates = false;
    // },
    // [addNewsArtCates.fulfilled.toString()]: (state) => {
    //   state.isAddingNewsArtCates = false;
    // },
    // [updateNewsArtCates.pending.toString()]: (state) => {
    //   state.isUpdaingNewsArtCates = true;
    // },
    // [updateNewsArtCates.rejected.toString()]: (state) => {
    //   state.isUpdaingNewsArtCates = false;
    // },
    // [updateNewsArtCates.fulfilled.toString()]: (state) => {
    //   state.isUpdaingNewsArtCates = false;
    // },
    // [deleteNewsArtCates.pending.toString()]: (state) => {
    //   state.isDeletingNewsArtCates = true;
    // },
    // [deleteNewsArtCates.rejected.toString()]: (state) => {
    //   state.isDeletingNewsArtCates = false;
    // },
    // [deleteNewsArtCates.fulfilled.toString()]: (state) => {
    //   state.isDeletingNewsArtCates = false;
    // },
  },
});
export const {
  setIsGettingNewsArtCates,
  setNewsArticleCates,
  setAllNewsArticleCates,
  setStatusAddNews,
  setStatusUpdateNews,
  setDeleteNews,
} = newsArtCatesSlice.actions;
export default newsArtCatesSlice.reducer;
