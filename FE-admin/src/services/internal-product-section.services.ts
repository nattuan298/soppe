import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import {
  ProductSectionBodyModel,
  ProductSectionModel,
} from "src/types/internal-product-section-loop.model";

export function editProductSectionService(
  productSection: ProductSectionModel,
): Promise<void | any> {
  const { productLoop, statusProSec: status, position, _id } = productSection;
  if (position === 0) {
    return authorizedRequest.patch(`${config.apiBaseUrl}/admin/products-sections/${_id}`, {
      productLoop,
      status,
    });
  }
  return authorizedRequest.patch(`${config.apiBaseUrl}/admin/products-sections/${_id}`, {
    productLoop,
    position,
    status,
  });
}

export function deleteProductSectionService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/products-sections/${id}`);
}

export function createProductSectionService(body: ProductSectionBodyModel): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/products-sections`, body);
}
