export interface OrderModel {
  approveBy : string;
  completedAt: string;
  createdAt : string;
  orderStatus : string;
  paymentMethod: string;
  products
  : Product[];
  shippingAddress
  : ShippingAddress;
  totalPrice:number;
  totalQuantity
  :number;
  updatedAt:string;
  userId
  :string;
  __v
  :
  number;
  _id
  :string;
}

export interface Product {
  images: string;
  productCode: string;
  productName: string;
  pv: number;
  quantity: number;
  mediaUrl: string;
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

export interface ShippingAddress {
  address:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
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
