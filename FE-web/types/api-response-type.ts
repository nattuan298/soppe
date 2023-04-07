export type BannersType = {
  status: string,
  _id: string,
  name: string,
  url:string,
  createdAt: string,
  updatedAt: string;
  __v: number
};

export interface Media {
  url: string;
  fileType: string;
  position: number;
  urlPreSign: string;
}

export interface Description {
  en: string;
  th: string;
}

export type ProductsType = {
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
  __v: number;
}[];

export type ProductType = {
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
  __v: number;
};

export type ReviewProductType = {
  rating: number;
  detail: string;
  memberName: string;
  photos: string[];
  memberAvatar: string;
  _id: string;
};

export type ArticlesType = { title: string; date: string; view: number; image: string }[];

export interface TemplateSections {
  _id: string;
  countdown: boolean;
  position: number;
  icon: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  sectionSlideId: string;
  data?: ProductType | BannersType;
}

export interface TransferBMCHistory {
  memberId: string;
  status: "Transferred" | "Received";
  pv: number;
  transferDate: string;
}

interface MultipleLanguage {
  en: string;
  th: string;
}
export interface NewsArticleModel {
  _id: string;
  name: MultipleLanguage;
  imageUrl: string;
  image: string;
  content: MultipleLanguage;
  category: string;
  endPublishDate: string;
  startPublishDate: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  status: string;
}

export interface PersonalStatisticType {
  memberId: string;
  posCurrent: string;
  pvLeft: string;
  pvRight: string;
  posLevel1: string;
  numSponsorLeft1: string;
  numSponsorRight1: string;
  pvLeft1: string;
  deductPvLeft1: string;
  pvRight1: string;
  deductPvRight1: string;
  posLevel2: string;
  numSponsorLeft2: string;
  numSponsorRight2: string;
  pvLeft2: string;
  deductPvLeft2: string;
  pvRight2: string;
  deductPvRight2: string;
  startSup: string;
  starEx: string;
  badgePosition: string;
  starPosition: string;
  currentMatching: string;
  highestPosition: string;
  sponsorInfo: {
    avatar: string;
    fullName: string;
    isVerified: boolean;
    sponsorId: string;
  };
  productValueLeft: number;
  productValueNewLeft: number;
  productValueNewRight: number;
  productValueRight: number;
  productValueOldLeft: number;
  productValueOldRight: number;
  bmcLeftHold: number;
  bmcRightHold: number;
  startLeft: string;
  startRight: string;
}

export interface OneEcomStatementType {
  date: string;
  in: string;
  out: string;
  remark: string;
}

export interface CycleFobType {
  round: string;
  fromDate: string;
  toDate: string;
  FOB: string;
  cycle: string;
  revenue: string;
}

export interface CycleHistoryType {
  date: string;
  cycle: string;
  total: string;
  oldLeft: string;
  oldRight: string;
  newLeft: string;
  newRight: string;
  sumLeft: string;
  sumRight: string;
  resultLeft: string;
  resultRight: string;
  pair: string;
  payoutRate: string;
}

export interface PVHistoryType {
  memberId: "string";
  memberName: "string";
  yth: "string";
  mth: "string";
  carryLeft: "string";
  carryRight: "string";
  pvLeft: "string";
  pvRight: "string";
  totalPvLeft: "string";
  totalPvRight: "string";
  cycle: "string";
  privatePv: "string";
  matchingPos: "string";
  newSponsor: "string";
  newSu: "string";
  newEx: "string";
  travelPoint: "string";
}

export interface NewPinSponsorType {
  APR: string;
  AUG: string;
  DEC: string;
  FEB: string;
  JAN: string;
  JUL: string;
  JUN: string;
  MAR: string;
  MAY: string;
  NOV: string;
  OCT: string;
  SEP: string;
  posid: string;
  posname: string;
  yth: string;
}

export interface NewRegisterEachType {
  mth: string;
  mth_index: string;
  new_ex: string;
  new_register: string;
  new_su: string;
  yth: string;
}

// export interface TravelPVHistoryType {
//   fromDate: string;
//   toDate: string;
//   total: string;
//   mb2su: string;
//   mb2ex: string;
//   priv: string;
//   leftPV: string;
//   rightPV: string;
//   tripPV: string;
// }
export interface TravelPVHistoryType {
  fromDate: string;
  toDate: string;
  total: string;
  mb2su: string;
  mb2ex: string;
  priv: string;
  leftPV: string;
  rightPV: string;
  tripPV: string;
}

export interface CommissionReportType {
  round: "string";
  fromDate: "string";
  toDate: "string";
  memberId: "string";
  carryOn: "string";
  fob: "string";
  cycle: "string";
  smb: "string";
  matching: "string";
  oneTime: "string";
  stockistBonus: "string";
  otherBonus: "string";
  adjustBonus: "string";
  totalBonus: "string";
  totalCarry_bonus: "string";
  carryOnBonus: "string";
  annualCommBonus: "string";
  vat: "string";
  wht: "string";
  freeTransfer: "string";
  voucher: "string";
  payDate: "string";
  transferEcomm: "string";
  lb: "string";
}
