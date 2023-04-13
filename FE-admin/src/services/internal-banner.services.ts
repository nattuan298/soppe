import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import {
  InternalBannerModel,
  InternalBannerModelBody,
  InternalBannerSectionBody,
  InternalBannerSectionModel,
} from "src/types/internal-banner.model";

export function editInternalBannerService(banner: InternalBannerModel): Promise<void | any> {
  const { _id, ...body } = banner;
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/banners/${_id}`, body);
}

export function deleteInternalBannerService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/banners/${id}`);
}

export function createInternalBannerService(body: InternalBannerModelBody): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/banners`, body);
}

export function createInternalBannerSectionService(
  body: InternalBannerSectionBody,
): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/banner-sections`, body);
}
export function editInternalBannerSectionService(
  banner: InternalBannerSectionModel,
): Promise<void | any> {
  const { _id, ...body } = banner;
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/banner-sections/${_id}`, body);
}

export function deleteInternalBannerSectionService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/banner-sections/${id}`);
}
