import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { ProductModel, ProductModelBody } from "src/types/inventory-management.model";

export function updateProductService(
  product: ProductModel,
  body: ProductModelBody,
): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/products/${product.productCode}`, body);
}
