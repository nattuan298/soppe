import { Document } from 'mongoose';
import { Gender, Role, Status } from 'src/common/common.constants';
export interface IAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  userId: string;
}

export type IAddressDocument = IAddress & Document;
