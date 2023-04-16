import { config } from "src/constants/config";
import { execute } from "src/lib/execute";
import { authorizedRequest } from "src/lib/request";
import { FAQBody } from "src/types/faq-category.model";

export function deleteFAQCategoryAPI(id: string) {
  return execute.delete(`${config.apiBaseUrl}/admin/products/category/${id}`);
}
export function createFAQCategory(body: FAQBody): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/products/category`, { ...body });
}
export function updateCategoryFAQ(params: { id: string; body: FAQBody }): Promise<void | any> {
  return authorizedRequest.patch(`${config.apiBaseUrl}/admin/faq-categories/${params.id}`, {
    ...params.body,
  });
}
