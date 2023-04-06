import { Document } from 'mongoose';

export interface IOrder {
  isNewProduct: boolean;
  description: string;
  rating: number;
  categoryId: string;
  ratingCount: number;
  stock: number;
  sold: number;
}
export type IOrderDoc = Document & IOrder;
