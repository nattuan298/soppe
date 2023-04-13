import { Address } from "src/types/order.model";

export function getShippingAddress(shippingAddress: Address): string {
  return `${shippingAddress.address}, 
  ${shippingAddress.subDistrict}, 
  ${shippingAddress.district}, 
  ${shippingAddress.province}, 
  ${shippingAddress.postalCode} ${shippingAddress.country}`;
}
export function getProductTotalPv(pv: number, quantity: number): number {
  return pv * quantity;
}
export function getProductTotalPrice(price: number, quantity: number): number {
  return price * quantity;
}
