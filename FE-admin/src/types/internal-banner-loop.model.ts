export interface InternalBannerLoopModel {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
  createdAt: string;
  numberOfBanner: number;
  updatedAt: string;
  countryCode: string;
}

export interface InternalBannerLoopBody {
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
}

export interface InternalBannerSectionModel extends InternalBannerLoopModel {
  type: string;
}
export interface InternalBannerSectionLoopBody extends InternalBannerLoopBody {
  type: string;
}
