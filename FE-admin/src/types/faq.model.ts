export interface FAQModel {
  _id: string;
  question: {
    en: string;
    th: string;
  };
  createdAt: string;
  publishStartDate: string;
  publishEndDate: string;
  status: string;
  views: number;
  helpful: number;
  notHelpful: number;
  category: CategoryFAQ;
  answer: {
    en: string;
    th: string;
  };
  id: string;
}
export interface FAQDetailModel {
  _id: string;
  question: {
    en: string;
    th: string;
  };
  createdAt: string;
  publishStartDate: string;
  publishEndDate: string;
  status: string;
  views: number;
  helpful: number;
  notHelpful: number;
  category: string;
  answer: {
    en: string;
    th: string;
  };
  id: string;
}
export interface CategoryFAQ {
  _id: string;
  name: string;
}
export interface FAQModelLang {
  question: {
    en: string;
    th: string;
  };
  category: string;
  publishStartDate: string | undefined;
  publishEndDate: string | undefined;
  status: string;
  answer: {
    en: string;
    th: string;
  };
}
