export interface FAQCategoryModel {
  _id: string;
  name: string;
  createdAt: string;
  totalFAQs: number;
  totalViews: number;
  isAbleToDelete: boolean;
}
export interface FAQBody {
  name: string;
}
export interface FAQCategoryDetail {
  status: string;
  _id: string;
  name: string;
}
