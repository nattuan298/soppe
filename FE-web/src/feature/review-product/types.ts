export interface ReviewProductType {
  sku: string | string[] | undefined;
  productName: string | string[] | undefined;
  productQuality: number;
  shippingQuality: number;
  detail: string;
  orderId: string | string[] | undefined;
  photos: string[];
}

export const FETCH_POST_PRODUCT_REVIEW = "product/review-product";

export interface WatcherFetchPostReview {
  payload: ReviewProductType;
  type: string;
}
