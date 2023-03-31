import { put } from "redux-saga/effects";
import paramsSerializer from "src/lib/paramsSerializer";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

import {
  favoriteMemberFulfilled,
  favoriteMemberPending,
  favoriteMemberRejected,
} from "./favorite-member.slice";
import {
  FETCH_FAVORITE_MEMBER_LIST,
  FavoriteMemberModel,
  WatcherFetchFavoriteMemberListType,
} from "./types";

const getFavoriteMember = async (keyword: string) => {
  const params = paramsSerializer({ keyword });
  const paramsURL = params !== "" ? `?${params}` : "";
  const response = await axios.get(`${apiRoute.members.favoriteMemberList}${paramsURL}`);
  return response.data;
};

export function* watcherFetchFavoriteMemberList(action: WatcherFetchFavoriteMemberListType) {
  try {
    yield put(favoriteMemberPending());
    const { payload } = action;
    const response: Promise<Array<FavoriteMemberModel>> = yield getFavoriteMember(payload);
    yield put(favoriteMemberFulfilled(response));
  } catch (error) {
    yield put(favoriteMemberRejected());
  }
}

export const fetchFavoriteMemberList = (payload: string) => ({
  type: FETCH_FAVORITE_MEMBER_LIST,
  payload,
});
