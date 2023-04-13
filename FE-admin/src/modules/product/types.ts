export interface Product {
  productCode: string;
  productName: string;
  pv: number;
  stock: number;
  sold: number;
  memberPrice: number;
  personalPrice: number;
  weight: number;
  categoryId: string;
  categoryName: string;
  sdate: string;
  edate: string;
  flag: string;
  media: [
    {
      url: string;
      fileType: string;
      position: number;
    },
  ];
  description: string;
  status: string;
}

export type PreviewProduct = {
  categoryCode?: string;
  categoryName?: string;
  description: string;
};

export type ProductName = {
  urlImage?: string;
  name?: string;
};

export type Rating = {
  numberStar?: number;
  review?: number;
};
