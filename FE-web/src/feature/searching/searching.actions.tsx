import { call, put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axiosCutome from "src/lib/client/request";
import { getPopularKeyWordsFulfilled } from "./searching.slice";
import { PopularKeyWord, SEARCH_GET_POPULATE } from "./searching.type";

const getPopularKeyWords = async () => {
  const response = await axiosCutome.get(`${apiRoute.search.popular}`);
  return response.data;
};
export function* getPopularKeyWordsActions() {
  try {
    const res: Array<PopularKeyWord> = yield call(() => getPopularKeyWords());
    yield put(getPopularKeyWordsFulfilled(res));
  } catch (error) {}
}

export const getPopularKeyWordsDispatch = () => ({
  type: SEARCH_GET_POPULATE,
});
