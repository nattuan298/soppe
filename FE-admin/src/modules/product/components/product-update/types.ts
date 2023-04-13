import { FileObject } from "material-ui-dropzone";

export interface Product {
  productCode: string;
  productName?: string;
  pv?: number;
  memberPrice?: number;
  personalPrice?: number;
  weight?: number;
  categoryId?: string;
  categoryName?: string;
  sdate?: string;
  edate?: string;
  flag?: string;
  media: [
    {
      url: string;
      fileType: string;
      position: number;
    },
  ];
  description?: string;
  stock?: number;
  sold?: number;
  numberStar?: number;
  review?: number;
}

export type PreviewProductImageVideo = [
  {
    url: string;
    fileType: string;
    position: number;
  },
];

export type Media = {
  _id?: string;
  url: string;
  fileType: string;
  position: number;
  urlPreSign?: string;
};

export interface MediaObject extends FileObject {
  _id?: string;
  fileType: string;
  urlPreSign?: string | ArrayBuffer | null;
  position: number;
  url?: string;
}
