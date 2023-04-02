import { Document } from 'mongoose';
export interface IAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  userId: string;
}

export type IAddressDocument = IAddress & Document;
