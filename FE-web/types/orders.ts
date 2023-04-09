export type OrderStatusType =
  | "To Ship"
  | "To Pay"
  | "To Receive"
  | "To Review"
  | "Complete"
  | "Cancel"
  | "Pending";

export type PatmentMethodType = "Credit/ Debit Card" | "QR Code";

export interface OrderAddressType {
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  country: string;
  postalCode: string;
  province: string;
  district: string;
  sub_district: string;
  address: string;

}

export interface OrderProductDetailType {
  isNewProduct: boolean;
  rating: number;
  ratingCount: number;
  _id: string;
  productName: string;
  mediaUrl: string;
  description: string;
  stock: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  quantity?:number;
  isReviewed?: boolean;
  __v: number;
}

export interface OrderDetailType {
  orderNumber: string;
  totalQuantity: number;
  totalPrice: number;
  totalPv: number;
  _id: string;
  status: OrderStatusType;
  paymentMethod: PatmentMethodType;
  products: OrderProductDetailType[];
  shippingAddress: OrderAddressType;
  billingAddress: OrderAddressType;
  createdBy: string;
  createdAt: string;
  pcode: string[];
  price: number[];
  shippingFees: number;
  totalShippingFees: number;
  taxes: number;
  totalProductPrice: number;
  totalWeight: number;
  trackingNumber: string;
  type: string;
  buyer: {
    memberId: string;
    name: string;
    phoneCode: string;
    phoneNumber: string;
    avatar: string;
  };
  chargeId: string;
  pickupAddress: {
    address: string;
    branch: string;
    branchEng: string;
    code: string;
    country: string;
    phoneCode: string;
    phoneNumbers: string[];
    province: string;
    addressEng?: string;
    _id: string;
    businessHours: string;
    businessHoursEng: string;
  };
  saType: "BMC" | "ROC";
  couponCode: string;
  couponDiscountCategory: string;
  couponRedeemAmount: number;
  locationBase: string;
  paymentState: string;
}

export interface OrderTrackingType {
  order: {
    orderNumber: string;
    _id: "612776530e343f29385375ae";
    status: "string";
    paymentMethod: PatmentMethodType;
    shippingAddress: OrderAddressType | null;
    billingAddress: OrderAddressType | null;
    createdBy: string;
    createdAt: string;
    trackingNumber: string;
    courierName: string;
  };
  trackingStatus: TrackingType[];
}

export interface TrackingType {
  statusCode: string;
  trackingNumber: string;
  name: string;
  statusDesc: string;
  updateDate: string;
  firstMileSignature: string;
}
