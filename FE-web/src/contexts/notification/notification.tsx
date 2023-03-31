import { ReactNode, useState } from "react";

export type Notification = {
  children?: ReactNode;
  message?: string;
};

export function useNotification(defaultNotification?: Notification) {
  const [notification, setNotification] = useState(defaultNotification);
  return { notification, setNotification };
}
