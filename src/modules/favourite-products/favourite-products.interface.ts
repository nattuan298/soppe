import { Document } from 'mongoose';

export interface IFavouriteProduct {
  productCode: string;
  memberId: string;
  createdAt: Date;
}
export type IFavouriteProductDoc = Document & IFavouriteProduct;
