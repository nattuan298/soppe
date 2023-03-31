export interface AddressModel {
  category?: string;
  shipAddress?: boolean;
  billAddress?: boolean;
  _id?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  postalCode?: string;
  province?: string;
  district?: string;
  subDistrict?: string;
  address?: string;
  phoneCode?: string;
  phoneNumber?: string;
  provinceId?: string;
  districtEng?: string;
  provinceEng?: string;
  subDistrictEng?: string;
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
  address: string;
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
  _id: string;
  name: string;
  nameEng: string;
}
export const GET_LIST_ADDRESS_BOOK = "GET_LIST_ADDRESS_BOOK";
export const GET_DETAIL_ADDRESS_BOOK = "GET_DETAIL_ADDRESS_BOOK";
