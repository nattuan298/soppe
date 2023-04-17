import { Address, PickupAddress, ShippingAddress } from "src/types/order.model";

export type PreviewType = {

  shippingAddress?: ShippingAddress;
  billingAddress?: Address;
  pickupAddress?: PickupAddress;
};
