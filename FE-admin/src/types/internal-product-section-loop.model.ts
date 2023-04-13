export interface InternalProductSectionLoopModel {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  numberOfProduct: number;
  updatedAt: string;
  countryCode: string;
}

export interface InternalProductSectionLoopBody {
  name: string;
  status: string;
}

interface ProducItemModify {
  productCode?: string;
  status?: string;
}
export interface ProductSectionBodyModel {
  products: Array<ProducItemModify>;
  productLoop: string;
  countryCode: string;
}

export interface ProductSectionModel {
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
  statusProSec: string;
  productLoop: string;
  position?: number;
  _id: string;
}
