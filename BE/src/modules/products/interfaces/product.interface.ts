import { Document } from 'mongoose';

export interface IProductLegacy {
  productName: string;
  pv: number;
  memberPrice: number;
  personalPrice: number;
  weight: number;
  categoryId: string;
  sdate: string;
  edate: string;
  flag: string;
  status: string;
  rating: number;
  stock: number;
  sold: number;
  description: string;
  isNewProduct: boolean;
  isFavourite: boolean;
  favouriteId: any;
  memberId: string;
  countApprovedReviews: number;
}

export interface IProduct {
  productCode: string;
  isNewProduct: boolean;
  description: string;
  rating: number;
}
export type IProductDoc = Document & IProduct;
