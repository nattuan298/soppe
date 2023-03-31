export interface FavoriteProductModel {
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
  media: [
    {
      url: string;
      urlPreSign: string;
      fileType: string;
      position: number;
    },
  ];
  status: string;
  rating: number;
  stock: number;
  sold: number;
  description: string;
  isNewProduct: boolean;
  isFavourite: boolean;
  favouriteId: number;
  memberId: number;
  _id: string;
  createdAt: string;
}
