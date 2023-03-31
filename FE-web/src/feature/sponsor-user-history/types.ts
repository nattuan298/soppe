export interface ParamsHistory {
  page?: number;
  pageSize?: number;
}

export type SponsorHistoryDetail = {
  _id: string;
  fullName: string;
  status: string;
  phoneCode: string;
  phoneNumber: string;
  citizenship: string;
  email: string;
  dateOfBirth: string;
  createdAt: string;
};

export type SponsorHistoryModel = {
  total?: number;
  page?: number;
  limit?: number;
  data?: SponsorHistoryDetail[];
};
