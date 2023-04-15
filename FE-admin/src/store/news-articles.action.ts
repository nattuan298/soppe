import { call, put } from "redux-saga/effects";
import { NewsArticle, NewsArticle2, NewsArticleParams } from "src/types/news-article.model";
import {
  addNewsArticleService,
  deleteNewsArticleService,
  getDetailNewsArticleService,
  getNewsArticleService,
  updateNewsArticleService,
} from "src/services/news-articles.services";
import {
  setDetailNewsArticles,
  setIsAddingNewsArt,
  setIsDeletingNewsArt,
  setIsGettingDetailNewsArt,
  setIsUpdatingNewsArt,
  setListNews,
  setLoadingNews,
} from "./news-articles.slice";
import {
  FETCH_ADD_NEWS_ARTICLE,
  FETCH_DELETE_NEWS_ARTICLE,
  FETCH_GET_DETAIL_NEWS,
  FETCH_GET_NEWS,
  FETCH_UPDATE_NEWS_ARTICLE,
} from "./news-articles.type";
import { CallbackResponse } from "src/types/common.modal";
// get list news article
export type FetchListNews = {
  type: string;
  payload: NewsArticleParams;
};
const getListNews = async (params: NewsArticleParams) => {
  const res = await getNewsArticleService(params);
  return res.data;
};
export function* watcherListNews(action: FetchListNews) {
  try {
    yield put(setLoadingNews({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getListNews(params));
    yield put(setListNews(response));
  } catch (error) {
    yield put(setLoadingNews({ loading: false }));
  }
}
export const getNewsAction = (payload: NewsArticleParams) => ({
  type: FETCH_GET_NEWS,
  payload,
});

// get detail news article
export type FetchDetailNews = {
  type: string;
  payload: string;
};
const getDetailNewsArticle = async (id: string) => {
  const res = await getDetailNewsArticleService(id);
  return res.data;
};
export function* watcherDetailNews(action: FetchDetailNews) {
  try {
    yield put(setIsGettingDetailNewsArt({ loading: true }));
    const id = action.payload;
    const response: Promise<any> = yield call(() => getDetailNewsArticle(id));
    yield put(setDetailNewsArticles(response));
  } catch (error) {
    yield put(setIsGettingDetailNewsArt({ loading: false }));
  }
}
export const getDetailNewsAction = (payload: string) => ({
  type: FETCH_GET_DETAIL_NEWS,
  payload,
});

// add article
export type FetchAddNews = {
  type: string;
  payload: CallbackResponse & { payload: Partial<NewsArticle> };
};
const addNews = async ({
  payload,
  onSuccess,
  onError,
}: CallbackResponse & { payload: Partial<NewsArticle> }) => {
  const res = await addNewsArticleService(payload);

  if (res.status === 201) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherAddNewsArticle(action: FetchAddNews) {
  try {
    yield put(setIsAddingNewsArt({ loading: true }));
    yield call(() => addNews(action.payload));
    yield put(setIsAddingNewsArt({ loading: false }));
  } catch (error) {
    yield put(setIsAddingNewsArt({ loading: false }));
  }
}
export const addNewsAction = (payload: CallbackResponse & { payload: Partial<NewsArticle> }) => ({
  type: FETCH_ADD_NEWS_ARTICLE,
  payload,
});

// update article
export type FetchUpdateNews = {
  type: string;
  payload: CallbackResponse & { id: string; payload: NewsArticle2 };
};
const updateNews = async ({
  id,
  payload,
  onSuccess,
  onError,
}: CallbackResponse & { id: string; payload: NewsArticle2 }) => {
  const res = await updateNewsArticleService(id, payload);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherUpdateNewsArticle(action: FetchUpdateNews) {
  try {
    yield put(setIsUpdatingNewsArt({ loading: true }));
    yield call(() => updateNews(action.payload));
    yield put(setIsUpdatingNewsArt({ loading: false }));
  } catch (error) {
    yield put(setIsUpdatingNewsArt({ loading: false }));
  }
}
export const updateNewsAction = (
  payload: CallbackResponse & { id: string; payload: NewsArticle2 },
) => ({
  type: FETCH_UPDATE_NEWS_ARTICLE,
  payload,
});

// delete article
export type FetchDeleteNews = {
  type: string;
  payload: CallbackResponse & { id: string };
};
const deleteNews = async ({ id, onSuccess, onError }: CallbackResponse & { id: string }) => {
  const res = await deleteNewsArticleService(id);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherDeleteNewsArticle(action: FetchDeleteNews) {
  try {
    yield put(setIsDeletingNewsArt({ loading: true }));
    yield call(() => deleteNews(action.payload));
    yield put(setIsDeletingNewsArt({ loading: false }));
  } catch (error) {
    yield put(setIsDeletingNewsArt({ loading: false }));
  }
}
export const deleteNewsAction = (payload: CallbackResponse & { id: string }) => ({
  type: FETCH_DELETE_NEWS_ARTICLE,
  payload,
});
