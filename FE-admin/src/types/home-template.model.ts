export interface TemplateHomeModel {
  _id: string;
  numberOfProSec: number;
  numberOfBannerSec: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  countryCode: string;
}

export interface TempateHomeSection {
  icon: string;
  name: string;
  countDown: boolean;
  startDate: string;
  endDate: string;
  type: string;
  position: number;
  sectionSlideId: string;
  _id?: string;
}

export interface TempateHomeBodyModel {
  status?: string;
  sections?: Array<TempateHomeSection>;
  name?: string;
  _id?: string;
  countryCode?: string;
}
