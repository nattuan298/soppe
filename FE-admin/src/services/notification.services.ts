import { authorizedRequest } from "src/lib/request";

import { config } from "src/constants/config";
import { NotificationModel } from "src/types/notification.model";

export function createNotificationService(body: NotificationModel): Promise<void | any> {
  return authorizedRequest.post(`${config.apiBaseUrl}/admin/notification-management`, body);
}

export function editNotificationService(
  id: string,
  notification: NotificationModel,
): Promise<void | any> {
  return authorizedRequest.put(
    `${config.apiBaseUrl}/admin/notification-management/${id}`,
    notification,
  );
}

export function deleteNotificationService(id: string): Promise<void | any> {
  return authorizedRequest.delete(`${config.apiBaseUrl}/admin/notification-management/${id}`);
}

export function activateNotificationService(id: string): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/notification-management/activate/${id}`);
}

export function deactivateNotificationService(id: string): Promise<void | any> {
  return authorizedRequest.put(
    `${config.apiBaseUrl}/admin/notification-management/deactivate/${id}`,
  );
}

export function readNotificationService(id: string): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/notifications/read`, { id: [id] });
}

export function readAllNotificationService(): Promise<void | any> {
  return authorizedRequest.put(`${config.apiBaseUrl}/admin/notifications/mark-read-all`);
}
