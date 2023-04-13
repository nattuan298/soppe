export interface NotificationModel {
  _id?: string;
  topic: string;
  createdAt: string;
  publishDate: string;
  target: string;
  channel: Array<string>;
  category: string;
  status: string;
  detail: string;
  isSent: boolean;
  hyperlink: string;
}

export interface InternalNotificationModel {
  channel: Array<string>;
  publishDate: string;
  status: string;
  _id: string;
  topic: string;
  detail: string;
  target: string;
  category: string;
  state: string;
  type?: string;
}
