import { StatusType } from "src/types/status.model";
import { AddressModel } from "src/types/address.model";

export type PreviewType = {
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  citizenship?: string;
  facebookConnect?: string;
  FAStatus?: string;
  shippingAddress?: AddressModel;
  billingAddress?: AddressModel;
  sponsorData?: {
    avatar?: string;
    name?: string;
    sponsorId: string;
  };
};

export type StatusOptionType = {
  title: string;
  value: StatusType;
};
