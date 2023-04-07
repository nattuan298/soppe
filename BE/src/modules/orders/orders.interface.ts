import { Document } from 'mongoose';
import { OrderStatus, PaymentMethod } from './orders.constant';

interface IAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface IProduct {
  mediaUrl: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  isReviewed: boolean;
  categoryId: string;
}

export interface IOrder {
  orderStatus: OrderStatus;
  totalQuantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  products: [IProduct];
  shippingAddress: IAddress;
  userId: string;
  approveBy: string;
  completedAt: Date;
}
export type IOrderDoc = Document & IOrder;
