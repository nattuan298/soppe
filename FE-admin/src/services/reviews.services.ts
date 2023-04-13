import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
export function approveReview(id: string): Promise<void> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/reviews/approve/${id}`);
}
export function RejectReview(id: string): Promise<void> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/reviews/reject/${id}`);
}
