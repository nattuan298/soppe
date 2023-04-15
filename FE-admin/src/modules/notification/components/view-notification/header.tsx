import { useTranslation } from "react-i18next";

import { readAllNotificationService } from "src/services/notification.services";
import { readAllNotifications } from "src/store/notification.slice";
import { fetchCountAllUnreadNotification } from "src/store/notification.action";
import { Select } from "src/components";
import { useDispatch, useSelector } from "react-redux";
import { notifyToast } from "src/constants/toast";
import { RootState } from "src/store";

interface PropsType {
  handleChangeCategory?: (value: string) => void;
  category: string;
}

export default function Header({ handleChangeCategory, category }: PropsType) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const { countAllUnreadNotifications } = useSelector((state: RootState) => state.notification);

  const handleChange = (value: string | null) => {
    if (value) {
      handleChangeCategory?.(value);
    }
  };

  const handleReadAllNotification = async () => {
    const response = await readAllNotificationService();
    if (response.statusCode) {
      return;
    }
    dispatch(readAllNotifications());
    dispatch(fetchCountAllUnreadNotification());
    if (countAllUnreadNotifications > 0) {
      notifyToast("default", "all_notifications_have_been_read", t);
    }
  };

  return (
    <div className="w-full flex justify-between top-0 bg-white">
      <Select
        className="w-32 select-notify-category"
        placeholder={t`select-category`}
        options={[
          { title: t`all-categories`, value: "all" },
          { title: t`news`, value: "News" },
          { title: t`notice`, value: "Notice" },
          { title: t`promotion`, value: "Promotion" },
        ]}
        defaultValue={category}
        onChange={handleChange}
      />
      <button
        onClick={handleReadAllNotification}
        className="mask-all text-sm"
      >{t`mask-all-as-read`}</button>
    </div>
  );
}
