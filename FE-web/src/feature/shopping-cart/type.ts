// import { AddresObjectType } from "../signup/type";

import { ProductType } from "types/api-response-type";

export type ProductTypeWithQty = ProductType & { qty: number };

export interface ShoppingCartType {
  isOpenSmallCart: boolean;
  callingListProduct: boolean;
  listProducts: ProductTypeWithQty[];
  selectedProduct: string[];
  errorWhenAddProduct: boolean;
  needToLogin: boolean;
}

export const FETCH_LIST_PRODUCT_IN_CART = "getListProductInCart";
