export interface ReviewProductType {
  productId?: string;
  rating: number;
  describe: string;
  mediaUrl: string;
}

export const FETCH_POST_PRODUCT_REVIEW = "product/review-product";

export interface WatcherFetchPostReview {
  payload: ReviewProductType;
  type: string;
}
