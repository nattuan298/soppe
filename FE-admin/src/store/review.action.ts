import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { ReviewModel } from "src/types/review.model";
import { setListReview, setLoading } from "./review.slice";
export const FETCH_GET_REVIEW = "FETCH_GET_REVIEW";

// get list review
export type FetchListReview = {
  type: string;
  payload: ParamListRequestModel;
};
const getListReview = async (params: ParamListRequestModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/reviews`, {
    params,
  })) as ApiListModel<ReviewModel>;
  return response;
};
export function* watcherGetListReview(action: FetchListReview) {
  try {
    yield put(setLoading({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getListReview(params));
    yield put(setListReview(response));
  } catch (error) {
    yield put(setLoading({ loading: false }));
  }
}
export const getListReviewAction = (payload: ParamListRequestModel) => ({
  type: FETCH_GET_REVIEW,
  payload,
});
