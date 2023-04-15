import { useMemo } from "react";

import { GoBack } from "src/components";
import { PushNotificationForm } from "src/modules/notification-management";
import { routePushNotificationManagement } from "src/constants/routes";

export default function TemplateHomeFormPage() {
  const page = sessionStorage.getItem("page-size");
  const url = useMemo(() => {
    if (!page) {
      return routePushNotificationManagement;
    }
    return `${routePushNotificationManagement}?page=${page}`;
  }, [page]);

  return (
    <div className="p-5">
      <GoBack url={url} />
      <PushNotificationForm />
    </div>
  );
}
