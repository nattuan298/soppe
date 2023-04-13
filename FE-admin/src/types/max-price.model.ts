export interface MaxPriceLocation {
  _id?: string;
  country: string;
  maxPrice: number;
  createdAt?: string;
  updatedAt?: string;
  type: string;
}

export interface ParamsMaxPrice {
  country: string;
  type: string;
}
