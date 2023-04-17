import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { ProductDetailType, ProductModel, ProductModelBody } from "src/types/inventory-management.model";

export function updateProductService(
  product: ProductModel,
  body: ProductModelBody,
): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/products/${product._id}`, body);
}

export function createProductService(
  body: ProductDetailType,
): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/products`, body);
}
