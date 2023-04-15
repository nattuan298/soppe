import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import {
  InternalBannerSectionLoopBody,
  InternalBannerSectionModel,
} from "src/types/internal-banner-loop.model";

export function editInternalBannerSectionLoopService(
  bannerLoop: InternalBannerSectionModel,
): Promise<void | any> {
  const { _id, ...body } = bannerLoop;
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/banner-section-loops/${_id}`, body);
}

export function deleteInternalBannerSectionLoopService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/banner-section-loops/${id}`);
}

export function createInternalBannerSectionLoopService(
  body: InternalBannerSectionLoopBody,
): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/banner-section-loops`, body);
}
