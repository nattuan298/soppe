export enum FileType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export enum ProductResponseMessage {
  NotFound = 'Product is not found',
}

export enum KeySort {
  MinMax = 'MIN-MAX',
  MaxMin = 'MAX-MIN',
  BySKUFromAToZ = 'A-Z',
  BySKUFromZToA = 'Z-A',
}

export const DELETE_POPULAR_KEY = 'deletePopularKey';
export const FALSE = 'false';

export enum ProductKeyBy {
  Personal = 'Personal',
  Member = 'Member',
}

export enum TypeMaxPrice {
  Product = 'Product',
  Voucher = 'Voucher',
}

export enum ProductEndPoint {
  MORE_FROM_OUT_STORE = 'MORE_FROM_OUT_STORE',
  PRODUCT_LISTING = 'PRODUCT_LISTING',
}

export enum ProductKeyFilter {
  Price = 'Price',
  Code = 'Code',
}
