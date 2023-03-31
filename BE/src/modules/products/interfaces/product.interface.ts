import { FileType } from '../product.constant';
import { Document } from 'mongoose';

export interface IMediaFile {
  url: string;
  fileType: FileType;
  position: number;
}

export interface IMultiLang {
  en: string;
  th: string;
}

export interface IProductLegacy {
  productCode: string;
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
  media?: IMediaFile[];
  description: IMultiLang;
  isNewProduct: boolean;
  isFavourite: boolean;
  favouriteId: any;
  memberId: string;
  countApprovedReviews: number;
}

export interface IProduct {
  productCode: string;
  isNewProduct: boolean;
  media: IMediaFile[];
  description: IMultiLang;
  rating: number;
}
export type IProductDoc = Document & IProduct;
