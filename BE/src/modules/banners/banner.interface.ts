import { Document } from 'mongoose';
import { BannerStatus } from './banner.constant';

export interface IBanner {
  name: string;
  status: BannerStatus;
  url: string;
}
export type IBannerDoc = Document & IBanner;
