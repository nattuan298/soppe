export interface ProductModel {
  productCode: string;
  productName: string;
  pv: number;
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
      urlPreSign?: string;
    },
  ];
  description: {
    en: string;
    th: string;
  };
  status: string;
  isNewProduct: boolean;
  rating: number;
  _id?: string;
  countApprovedReviews: number;
}

export interface DescriptionType {
  en: string;
  th: string;
}
export interface ProductModelBody {
  isNewProduct: boolean;
  media: Array<{
    url: string;
    fileType: string;
    position: number;
  }>;
  description: DescriptionType;
}
