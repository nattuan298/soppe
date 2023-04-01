import { Document } from 'mongoose';

export interface IProduct {
  isNewProduct: boolean;
  description: string;
  rating: number;
  categoryId: string;
  ratingCount: number;
  stock: number;
  sold: number;
}
export type IProductDoc = Document & IProduct;
