import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import {
  InternalProductSectionLoopBody,
  InternalProductSectionLoopModel,
} from "src/types/internal-product-section-loop.model";

export function editInternalProductSectionLoopService(
  productSectionLoop: InternalProductSectionLoopModel,
): Promise<void | any> {
  const { _id, ...body } = productSectionLoop;
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/product-section-loops/${_id}`, body);
}

export function deleteInternalProductSectionLoopService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/product-section-loops/${id}`);
}

export function createInternalProductSectionLoopService(
  body: InternalProductSectionLoopBody,
): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/product-section-loops`, body);
}
