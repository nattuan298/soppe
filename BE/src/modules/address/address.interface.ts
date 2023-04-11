import { Document } from 'mongoose';
export interface IAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressDetail: string;
  userId: string;
  province: string;
  district: string;
  sub_district: string;
}

export type IAddressDocument = IAddress & Document;
