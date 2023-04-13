export interface OrderModel {
  _id: string;
  arrivingDate?: string;
  orderNumber: string;
  quantity: string;
  totalQuantity: number;
  totalPrice: number;
  totalPv: number;
  totalProductPrice: number;
  totalShippingFees: number;
  status: string;
  paymentMethod: string;
  pickupAddress: {
    branch: string;
    code: string;
    country: string;
    province: string;
    _id: string;
    address: string;
    addressEng: string;
    phoneCode: string;
    phoneNumbers: string[];
    branchEng?: string;
    provinceEng?: string;
    businessHours?: string;
    businessHoursEng?: string;
  };
  courierName?: string;
  trackingNumber?: string;
  createdBy: string;
  createdAt: string;
  products: Product[];
  taxes: number;
  shippingFees: number;
  shippingAddress: Address;
  billingAddress: Address;
  type: string;
  buyer: {
    avatar: string;
    avatarImage: string;
    memberId: string;
    name: string;
    phoneCode: string;
    phoneNumber: string;
    documentStatus: string;
    _id: string;
  };
  couponRedeemAmount?: number;
  unit?: string;
  statusCode?: number;
}

export interface Product {
  images: string;
  productCode: string;
  productName: string;
  pv: number;
  quantity: number;
  price: number;
  unit: string;
  productImage: string;
  _id: string;
  fileType: string;
  isReviewed: boolean;
}

export interface Address {
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  country: string;
  postalCode: string;
  province: string;
  district: string;
  subDistrict: string;
  address: string;
  provinceEng?: string;
  districtEng?: string;
  subDistrictEng?: string;
}

export interface PickupAddress {
  branch: string;
  code: string;
  country: string;
  province: string;
  _id: string;
  address: string;
  addressEng?: string;
  phoneCode: string;
  phoneNumbers: string[];
  branchEng?: string;
  provinceEng?: string;
  name?: string;
  nameEng?: string;
  businessHours: string;
  businessHoursEng: string;
}

type PickupAddressRequest = Omit<PickupAddress, "_id">;

export interface UpdateOrderRequest {
  shippingAddress?: Address;
  billingAddress?: Address;
  pickupAddress?: PickupAddressRequest;
  type: string;
}

export interface TrackingStatusModel {
  name: string;
  statusCode: string;
  statusDesc: string;
  updateDate: string;
  trackingNumber: string;
  lastMileSignature: string;
  _id: string;
}
