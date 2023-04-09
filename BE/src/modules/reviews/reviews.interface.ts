import { Document } from 'mongoose';

export interface IReviewProduct {
  productId: string;
  userId: string;
  orderId: string;
  rating: number;
  describe: string;
  mediaUrl: string;
}
export type IReviewProductDoc = Document & IReviewProduct;
