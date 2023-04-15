export interface AddressModel {
  addressDetail: string;
  createdAt?: string;
  district: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  province: string;
  subDistrict: string;
  updatedAt?: string;
  userId?: string;
  __v?: number;
  _id?: string;
  phoneCode?: string;
}
export type AddressModel2 = {
  category: string;
  shipAddress: boolean;
  billAddress: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  country: string;
  postalCode: number;
  province: string;
  district: string;
  subDistrict: string;
  addressDetail: string;
  phoneCode: string;
  phoneNumber: string;
};
export interface AddressModelList {
  category: string;
  shipAddress: boolean;
  billAddress: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  country: string;
  postalCode: string;
  province: string;
  district: string;
  subDistrict: string;
  address: string;
  phoneCode: string;
  phoneNumber: string;
}
export interface ItemArrayConvert {
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
}
export const GET_LIST_ADDRESS_BOOK = "GET_LIST_ADDRESS_BOOK";
export const GET_DETAIL_ADDRESS_BOOK = "GET_DETAIL_ADDRESS_BOOK";
