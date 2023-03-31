import { put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { FETCH_POST_PRODUCT_REVIEW, ReviewProductType, WatcherFetchPostReview } from "./types";
import {
  Reviews,
  productReviewPostFulfilled,
  productReviewPostPending,
  productReviewPostRejected,
} from "./review-product.slice";

const productReviewPost = async (params: ReviewProductType) => {
  try {
    const response = await axios.post(`${apiRoute.reviewProduct.reviewProduct}`, params);
    return response;
  } catch (error) {}
};

export function* watcherFetchPostProductReview(action: WatcherFetchPostReview) {
  try {
    const { payload } = action;
    yield put(productReviewPostPending());
    const res: Reviews = yield productReviewPost(payload);
    yield put(productReviewPostFulfilled(res));
  } catch (error) {
    yield put(productReviewPostRejected());
  }
}

export const fetchPostProductReview = (payload: ReviewProductType) => ({
  type: FETCH_POST_PRODUCT_REVIEW,
  payload,
});
