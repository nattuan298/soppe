import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { UpdateOrderRequest } from "src/types/order.model";

export function updateOrder(params: { id: string; body: UpdateOrderRequest }): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/orders/${params.id}`, {
    ...params.body,
  });
}

export function getProvincesContainBranches(country: string | undefined): Promise<void> {
  return authorizedRequest.get(
    `${config.apiBaseUrl}/provinces/contain-branches/?country=${country}`,
  );
}

export function getBranches(provinceId: string | undefined): Promise<void> {
  return authorizedRequest.get(`${config.apiBaseUrl}/branches/checkout/?provinceId=${provinceId}`);
}

export function getOrder(id: string): Promise<void | any> {
  return authorizedRequest.get(`${config.apiBaseUrl}/orders/${id}`);
}
