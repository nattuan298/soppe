import { AddressModel } from "./address.model";

export interface userModel {
  memberId: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneCode: string;
  status: string;
  matching: string;
  expiredDate: string;
  phoneNumber: string;
  citizenship: string;
  avatar: {
    key: string;
    url: string;
  };
  gender: string;
  documentStatus: string;
  twoFaStatus: string;
  googleAuth: boolean;
  smsAuth: boolean;
  dateOfBirth: string;
  facebookAuth: boolean;
  email: string;
  images: {
    key: string;
    type: string;
    url: string;
  }[];
  sponsor: {
    avatar: string;
    name: string;
    sponsorId: string;
  };
  shippingAddress: AddressModel;
  billingAddress: AddressModel;
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
