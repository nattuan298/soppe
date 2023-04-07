import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { OrderStatus, PaymentMethod } from '../orders.constant';

const ORDER_MODEL = 'orders';

const AddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
  {
    _id: false,
  },
);

const productSchema = new mongoose.Schema(
  {
    mediaUrl: {
      type: String,
      default: '',
    },
    productId: {
      type: String,
      default: '',
    },
    productName: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    categoryId: String,
  },
  {
    _id: false,
  },
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: '',
    },
    orderStatus: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.WAITING_APPROVE,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.COD,
    },
    products: [productSchema],
    shippingAddress: AddressSchema,
    approveBy: {
      type: String,
      default: '',
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(mongooseAggregatePaginate);
export { OrderSchema, ORDER_MODEL };
