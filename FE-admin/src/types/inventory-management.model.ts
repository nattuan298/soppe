export interface ProductModel {
  isNewProduct: boolean;
  rating: number;
  ratingCount: number;
  _id: string;
  productName: string;
  mediaUrl:string;
  description: string;
  stock: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
export interface ProductDetailType {
  productName: string;
  mediaUrl: string;
  description: string;
  stock: number;
  price: number;
  categoryId: string;
}
