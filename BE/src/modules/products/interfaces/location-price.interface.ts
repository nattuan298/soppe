import { TypeMaxPrice } from '../product.constant';

export interface ILocationPrice {
  maxPrice: number;
  type: TypeMaxPrice;
}
export type ILocationPriceDoc = Document & ILocationPrice;
