import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import {
  InternalBannerLoopBody,
  InternalBannerLoopModel,
} from "src/types/internal-banner-loop.model";

export function editInternalBannerLoopService(
  bannerLoop: InternalBannerLoopModel,
): Promise<void | any> {
  const { _id, ...body } = bannerLoop;
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/banner-loops/${_id}`, body);
}

export function deleteInternalBannerLoopService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/banner-loops/${id}`);
}

export function createInternalBannerLoopService(body: InternalBannerLoopBody): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/banner-loops`, body);
}
