import { createSlice } from "@reduxjs/toolkit";

import { List } from "src/types/common.modal";
import { NewsArticle, NewsArticle2, NewsArticleParams } from "src/types/news-article.model";

// export const getNewsArticle = createAsyncThunk(
//   "newsArticle/getNewsArticle",
//   async (params: NewsArticleParams) => {
//     const res = await getNewsArticleService(params);
//     return res.data;
//   },
// );

// export const getDetailNewsArticle = createAsyncThunk(
//   "newsArticle/getDetailNewsArticle",
//   async (id: string) => {
//     const res = await getDetailNewsArticleService(id);
//     return res.data;
//   },
// );

// export const addNewsArt = createAsyncThunk(
//   "newsArticle/addNewsArt",
//   async ({ payload, onSuccess, onError }: CallbackResponse & { payload: Partial<NewsArticle> }) => {
//     const res = await addNewsArticleService(payload);

//     if (res.status === 201) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

// export const updateNewsArt = createAsyncThunk(
//   "newsArticle/updateNewsArt",
//   async ({
//     id,
//     payload,
//     onSuccess,
//     onError,
//   }: CallbackResponse & { id: string; payload: NewsArticle2 }) => {
//     const res = await updateNewsArticleService(id, payload);
//     if (res.status === 200) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

// export const deleteNewsArt = createAsyncThunk(
//   "newsArticle/deleteNewsArt",
//   async ({ id, onSuccess, onError }: CallbackResponse & { id: string }) => {
//     const res = await deleteNewsArticleService(id);
//     if (res.status === 200) {
//       onSuccess && onSuccess();
//     } else if (res.status !== 403) {
//       onError && onError(res.data);
//     }
//     return res;
//   },
// );

interface InitialStateType {
  newsArticles: List<NewsArticle>;
  detailNewsArticles: NewsArticle;
  isGettingNewsArt: boolean;
  isGettingDetailNewsArt: boolean;
  isAddingNewsArt: boolean;
  isUpdaingNewsArt: boolean;
  isDeletingNewsArt: boolean;
  CanSwitch: boolean;
}

const initialState: InitialStateType = {
  newsArticles: {
    data: [],
    limit: 5,
    page: 1,
    total: 0,
  },
  detailNewsArticles: {
    _id: "",
    name: {
      en: "",
      th: "",
    },
    category: "",
    status: "Active",
    image: "",
    imageUrl: "",
    startPublishDate: "",
    endPublishDate: "",
    content: {
      en: "",
      th: "",
    },
    views: 0,
    createdAt: "",
    updatedAt: "",
  },
  isGettingNewsArt: false,
  isGettingDetailNewsArt: false,
  isAddingNewsArt: false,
  isUpdaingNewsArt: false,
  isDeletingNewsArt: false,
  CanSwitch: true,
};

const newsArtSlice = createSlice({
  name: "newsArtSlice",
  initialState,
  reducers: {
    setCanSwitch: (state, action) => {
      state.CanSwitch = action.payload;
    },
    resetDetailNewsArticles: (state) => {
      state.detailNewsArticles = {
        _id: "",
        name: {
          en: "",
          th: "",
        },
        category: "",
        status: "Active",
        image: "",
        imageUrl: "",
        startPublishDate: "",
        endPublishDate: "",
        content: {
          en: "",
          th: "",
        },
        views: 0,
        createdAt: "",
        updatedAt: "",
      };
    },
    setLoadingNews: (state, action) => {
      state.isGettingNewsArt = action.payload.loading;
    },
    setListNews: (state, action) => {
      state.isGettingNewsArt = false;
      state.newsArticles = action.payload;
    },
    setIsGettingDetailNewsArt: (state, action) => {
      state.isGettingDetailNewsArt = action.payload.loading;
    },
    setDetailNewsArticles: (state, action) => {
      state.isGettingDetailNewsArt = false;
      state.detailNewsArticles = action.payload;
    },
    setIsAddingNewsArt: (state, action) => {
      state.isAddingNewsArt = action.payload.loading;
    },
    setIsUpdatingNewsArt: (state, action) => {
      state.isUpdaingNewsArt = action.payload.loading;
    },
    setIsDeletingNewsArt: (state, action) => {
      state.isDeletingNewsArt = action.payload.loading;
    },
  },
  extraReducers: {
    // [getNewsArticle.pending.toString()]: (state) => {
    //   state.isGettingNewsArt = true;
    // },
    // [getNewsArticle.rejected.toString()]: (state, action) => {
    //   state.isGettingNewsArt = false;
    // },
    // [getNewsArticle.fulfilled.toString()]: (state, action: PayloadAction<List<NewsArticle>>) => {
    //   state.isGettingNewsArt = false;
    //   state.newsArticles = action.payload;
    // },
    // [getDetailNewsArticle.pending.toString()]: (state) => {
    //   state.isGettingDetailNewsArt = true;
    // },
    // [getDetailNewsArticle.rejected.toString()]: (state) => {
    //   state.isGettingDetailNewsArt = false;
    // },
    // [getDetailNewsArticle.fulfilled.toString()]: (state, action: PayloadAction<NewsArticle>) => {
    //   state.isGettingDetailNewsArt = false;
    //   state.detailNewsArticles = action.payload;
    // },
    // [addNewsArt.pending.toString()]: (state) => {
    //   state.isAddingNewsArt = true;
    // },
    // [addNewsArt.rejected.toString()]: (state) => {
    //   state.isAddingNewsArt = false;
    // },
    // [addNewsArt.fulfilled.toString()]: (state) => {
    //   state.isAddingNewsArt = false;
    // },
    // [updateNewsArt.pending.toString()]: (state) => {
    //   state.isUpdaingNewsArt = true;
    // },
    // [updateNewsArt.rejected.toString()]: (state) => {
    //   state.isUpdaingNewsArt = false;
    // },
    // [updateNewsArt.fulfilled.toString()]: (state) => {
    //   state.isUpdaingNewsArt = false;
    // },
    // [deleteNewsArt.pending.toString()]: (state) => {
    //   state.isDeletingNewsArt = true;
    // },
    // [deleteNewsArt.rejected.toString()]: (state) => {
    //   state.isDeletingNewsArt = false;
    // },
    // [deleteNewsArt.fulfilled.toString()]: (state) => {
    //   state.isDeletingNewsArt = false;
    // },
  },
});
export const {
  setCanSwitch,
  resetDetailNewsArticles,
  setLoadingNews,
  setListNews,
  setIsGettingDetailNewsArt,
  setDetailNewsArticles,
  setIsAddingNewsArt,
  setIsUpdatingNewsArt,
  setIsDeletingNewsArt,
} = newsArtSlice.actions;

export default newsArtSlice.reducer;
