export interface InternalBannerModel {
  _id: string;
  name: string;
  status: string;
  hyperlink?: string;
  imageType: string;
  bannerLoop?: string;
  position: number;
  desktopBanner: string;
  tabletBanner: string;
  mobileBanner: string;
  createdAt: string;
  desktopBannerUrl: string;
  tabletBannerUrl: string;
  mobileBannerUrl: string;
}

export interface InternalBannerModelBody {
  name: string;
  status: string;
  hyperlink: string;
  imageType?: string;
  bannerLoop: string;
  position?: number;
  desktopBanner: string;
  tabletBanner: string;
  mobileBanner: string;
}

export interface InternalBannerSectionModel extends InternalBannerModel {
  type?: string;
}
export interface InternalBannerSectionBody extends InternalBannerModelBody {
  type?: string;
}
export interface InternalBannerSectionBodyPatch {
  _id: string;
  name?: string;
  status?: string;
  hyperlink?: string;
  imageType?: string;
  bannerLoop?: string;
  position?: number;
  desktopBanner?: string;
  tabletBanner?: string;
  mobileBanner?: string;
  createdAt?: string;
  desktopBannerUrl?: string;
  tabletBannerUrl?: string;
  mobileBannerUrl?: string;
  type?: string;
}
