export interface UserInforType {
  documentStatus: "Pending" | "Complete";
  memberId: string;
  prefixName: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  citizenship: string;
  smsAuth: boolean;
  facebookAuth: boolean;
  avatar: string;
  avatarKey: string;
}

export interface UserSliceType {
  userInfor: UserInforType | null;
  urlRedirect: string;
  scmPoint: number;
  productValueRight: number;
  productValueLeft: number;
  eCommission: number;
  expireDate: string;
  joinedDate: string;
  preUrl: string;
  currUrl: string;
}

export interface PointType {
  scmPoint: number;
  productValueRight: number;
  productValueLeft: number;
  eCommission: number;
  expireDate: string;
  joinedDate: string;
}

export const FETCH_USER_INFORMATION = "user/getUserInformation";
export const FETCH_POINTS = "user/getPoints";
