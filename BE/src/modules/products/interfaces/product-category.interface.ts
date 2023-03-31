import { Document } from 'mongoose';

export interface IProductCategory {
  keyword: string;
}
export type IProductCategoryDoc = Document & IProductCategory;
