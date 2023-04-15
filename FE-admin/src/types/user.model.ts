import { AddressModel } from "./address.model";

export interface userModel {
  avatar:string;
  code:string;
  createdAt:string;
  dateOfBirth:string;
  email:string;
  firstName:string;
  gender:string;
  lastName:string;
  phoneNumber:string
  role:string;
  status:string;
  updatedAt:string;
  updatedPasswordAt:string;
  username:string;
  __v:number;
  _id:string;
}

export interface UpdateUserRequestModel {
  memberId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phoneCode?: string;
  status?: string;
  matching?: string;
  expiredDate?: string;
  phoneNumber?: string;
  citizenship?: string;
  avatar?: string;
  gender?: string;
  documentStatus?: string;
  twoFaStatus?: string;
  googleAuth?: boolean;
  smsAuth?: boolean;
  dateOfBirth?: string;
  facebookAuth: boolean;
  email?: string;
  images: {
    key: string;
    type: string;
  }[];
  sponsor?: {
    avatar?: string;
    name?: string;
    sponsorId: string;
  };
  shippingAddress?: AddressModel;
  billingAddress?: AddressModel;
}
export interface ItemArraySelect {
  _id: string;
  name: string;
  nameEng: string;
}
export interface ItemArrayConvert {
  _id: string;
  name: string;
  nameEng: string;
}
