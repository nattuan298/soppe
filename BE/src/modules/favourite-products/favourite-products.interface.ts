import { Document } from 'mongoose';

export interface IFavouriteProduct {
  productId: string;
  userId: string;
  mediaUrl: string;
  productName: string;
  createdAt: Date;
}
export type IFavouriteProductDoc = Document & IFavouriteProduct;
