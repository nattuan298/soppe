export interface FAQCategoriesModel {
  _id: string;
  name: string;
}

export interface FAQModel {
  _id: string;
  question: {
    en: string;
    th: string;
  };
}

export interface FAQs {
  faqCategory: FAQCategoriesModel;
  faqs: FAQModel[];
}

export interface FAQDetailModel {
  views?: number;
  helpful?: number;
  _id?: String;
  question?: {
    en: string;
    th: string;
  };
  answer?: {
    en: string;
    th: string;
  };
  publishStartDate?: string;
  category?: {
    _id: string;
  };
}

export interface ParamsFAQs {
  keyword?: string;
  sort?: string;
  category: string;
}

// export interface listBranchSelect {
//   _id: string;
//   phoneNumbers?: string[] | undefined;
//   name?: string | undefined;
//   nameEng?: string | undefined;
//   address?: string | undefined;
//   addressEng?: string | undefined;
//   businessHours?: string | undefined;
//   businessHoursEng?: string | undefined;
//   latitude?: string | undefined;
//   longitude?: string | undefined;
//   provinceId?: string | undefined;
//   createdAt?: string | undefined;
//   updatedAt?: string | undefined;
//   __v?: number | undefined;
//   phoneCode?: string;
// }
export interface listBranchThaiSelect {
  _id: string;
  phoneNumbers?: string[];
  name?: string;
  address?: string;
  businessHours?: string;
  latitude?: string;
  longitude?: string;
  provinceId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  phoneCode?: string;
}
export interface listBranchSelect {
  _id: string;
  phoneNumbers?: string[];
  nameEng?: string;
  addressEng?: string;
  businessHoursEng?: string;
  latitude?: string;
  longitude?: string;
  provinceId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  phoneCode?: string;
  name?: string;
  address?: string;
  businessHours?: string;
  googleMapUrl?: string;
}
