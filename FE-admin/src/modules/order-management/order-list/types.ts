import { Address, PickupAddress } from "src/types/order.model";

export type PreviewType = {
  buyer: {
    name: string;
    id: string;
    avatar?: string;
    documentStatus?: string;
  };
  shippingAddress?: Address;
  billingAddress?: Address;
  pickupAddress?: PickupAddress;
};
