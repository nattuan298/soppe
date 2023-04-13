import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { FAQModelLang } from "src/types/faq.model";

export function deleteFAQ(id: string): Promise<void> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/faqs/${id}`);
}
export function activateFAQ(id: string): Promise<void> {
  return authorizedRequest.patch(`${config.apiBaseUrl}/admin/faqs/${id}/activate`);
}
export function deactivateFAQ(id: string): Promise<void> {
  return authorizedRequest.patch(`${config.apiBaseUrl}/admin/faqs/${id}/deactivate`);
}
export function createFAQ(body: FAQModelLang): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/faqs`, { ...body });
}
export function updateFAQ(params: { id: string; body: FAQModelLang }): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/faqs/${params.id}`, {
    ...params.body,
  });
}

export function PreviewFAQ(id: string): Promise<void> {
  return authorizedRequest.get(`${config.apiBaseUrl}/admin/faqs/${id}/preview`);
}
