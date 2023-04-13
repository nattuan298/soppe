export interface UserHistoryModel {
  IP: string;
  OS: string;
  avatar: string;
  createdAt: string;
  firstName: string;
  imageUrl: string;
  lastName: string;
  memberId: string;
  phoneCode: string;
  phoneNumber: string;
  type: string;
  updatedAt: string;
  channel: string;
}
export interface InternalUserHistoryModel {
  imageUrl: string;
  roles: [
    {
      _id: string;
      name: string;
    },
  ];
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  type: string;
  OS: string;
  IP: string;
  lastModified: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  twoFactorStatus: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface DataExportModel {
  imageUrl: string;
  roles: [
    {
      _id: string;
      name: string;
    },
  ];
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  type: string;
  OS: string;
  IP: string;
  lastModified: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  twoFactorStatus: boolean;
  exportedData: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
