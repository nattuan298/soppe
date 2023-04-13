import { call, put } from "redux-saga/effects";
import {
  addNewsArticleCateService,
  deleteNewsArticleCateService,
  getAllNewsArticleCateService,
  getNewsArticleCateService,
  updateNewsArticleCateService,
} from "src/services/news-articles-category.services";
import { CallbackResponse, SearchParams } from "src/types/common.modal";
import {
  setAllNewsArticleCates,
  setDeleteNews,
  setIsGettingNewsArtCates,
  setNewsArticleCates,
  setStatusAddNews,
  setStatusUpdateNews,
} from "./news-article-categories.slice";
import {
  FETCH_ADD_NEWS,
  FETCH_DELETE_NEWS,
  FETCH_GET_ALL_CATEGORY_NEWS,
  FETCH_GET_CATEGORY_NEWS,
  FETCH_UPDATE_NEWS,
} from "./news-article-categories.type";

// get category
export type FetchCategoryArt = {
  type: string;
  payload: SearchParams;
};
const getCategoryArt = async (params: SearchParams) => {
  const res = await getNewsArticleCateService(params);
  return res.data;
};
export function* watcherGetListCategoryArt(action: FetchCategoryArt) {
  try {
    yield put(setIsGettingNewsArtCates({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getCategoryArt(params));
    yield put(setNewsArticleCates(response));
  } catch (error) {
    yield put(setIsGettingNewsArtCates({ loading: false }));
  }
}
export const getCategoryArtAction = (payload: SearchParams) => ({
  type: FETCH_GET_CATEGORY_NEWS,
  payload,
});

// get all category
const getAllCategoryNews = async () => {
  const res = await getAllNewsArticleCateService();
  if (res.status === 200) return res.data;
};
export function* watcherGetAllCategoryNews() {
  try {
    const response: Promise<any> = yield call(() => getAllCategoryNews());
    yield put(setAllNewsArticleCates(response));
  } catch (error) {}
}
export const getAllCategoryArtAction = () => ({
  type: FETCH_GET_ALL_CATEGORY_NEWS,
});

// add news
export type FetchAddNews = {
  type: string;
  payload: CallbackResponse & { name: string };
};
const addNewsArtCates = async ({
  name,
  onSuccess,
  onError,
}: CallbackResponse & { name: string }) => {
  const res = await addNewsArticleCateService(name);
  if (res.status === 201) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherAddNews(action: FetchAddNews) {
  try {
    yield put(setStatusAddNews({ loading: true }));
    yield call(() => addNewsArtCates(action.payload));
    yield put(setStatusAddNews({ loading: false }));
  } catch (error) {
    yield put(setStatusAddNews({ loading: false }));
  }
}
export const addNewsAction = (payload: CallbackResponse & { name: string }) => ({
  type: FETCH_ADD_NEWS,
  payload,
});

// update news
export type FetchUpdateNews = {
  type: string;
  payload: CallbackResponse & { id: string; name: string };
};
const updateNews = async ({
  id,
  name,
  onSuccess,
  onError,
}: CallbackResponse & { id: string; name: string }) => {
  const res = await updateNewsArticleCateService(id, name);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherUpdateNews(action: FetchUpdateNews) {
  try {
    yield put(setStatusUpdateNews({ loading: true }));
    yield call(() => updateNews(action.payload));
    yield put(setStatusUpdateNews({ loading: false }));
  } catch (error) {
    yield put(setStatusUpdateNews({ loading: false }));
  }
}
export const updateNewsAction = (payload: CallbackResponse & { id: string; name: string }) => ({
  type: FETCH_UPDATE_NEWS,
  payload,
});

// delete news
export type FetchDeleteNews = {
  type: string;
  payload: CallbackResponse & { id: string };
};
const deleteNews = async ({ id, onSuccess, onError }: CallbackResponse & { id: string }) => {
  const res = await deleteNewsArticleCateService(id);
  if (res.status === 200) {
    onSuccess && onSuccess();
  } else if (res.status !== 403) {
    onError && onError(res.data);
  }
  return res;
};
export function* watcherDeleteNews(action: FetchDeleteNews) {
  try {
    yield put(setDeleteNews({ loading: true }));
    yield call(() => deleteNews(action.payload));
    yield put(setDeleteNews({ loading: false }));
  } catch (error) {
    yield put(setDeleteNews({ loading: false }));
  }
}
export const deleteNewsAction = (payload: CallbackResponse & { id: string }) => ({
  type: FETCH_DELETE_NEWS,
  payload,
});
