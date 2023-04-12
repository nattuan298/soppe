export interface UserInforType {
  avatar:string;
  code:string;
  createdAt:string;
  dateOfBirth:string;
  email:string;
  firstName:string;
  gender:string;
  lastName:string;
  password:string;
  phoneNumber:string;
  role:string;
  salt:string;
  status:string;
  updatedAt:string;
  updatedPasswordAt:string;
  username:string;
  __v:number;
  _id:string;
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
