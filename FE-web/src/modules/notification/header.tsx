import useTranslation from "next-translate/useTranslation";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { notifyToast } from "src/constants/toast";

import {
  readAllNotification,
  readAllNotifications,
} from "src/feature/notifications/notification.slice";
import { fetchCountNotificationUnread } from "src/feature/notifications/notification.action";
import { Select } from "src/components";
import styles from "./style.module.css";
import { RootState } from "src/state/store";

type OptionType = {
  title: string;
  value: string;
};

interface PropsType {
  handleChangeCategory?: (value: string) => void;
  category: string;
}
export default function Header({ handleChangeCategory, category }: PropsType) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const { countUnreadCommon } = useSelector((state: RootState) => state.notification);

  const handleChange = ({ value }: OptionType) => {
    handleChangeCategory?.(value);
  };

  const handleReadAllNotification = async () => {
    const response = await readAllNotification();
    if (response.status === 204) {
      dispatch(readAllNotifications());
      dispatch(fetchCountNotificationUnread());
      if (countUnreadCommon > 0) {
        notifyToast("default", "all_notifications_have_been_read", t);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-between top-0 bg-white pl-4 sm:pl-0 pt-[20px] sm:pt-0 pb-[10px] sm:pb-0">
      <Select
        selectClassName={classNames(
          "border-0 text-orange w-auto sm:w-44 !p-0 sm:!p-3.5",
          styles.selectNotifyCategory,
        )}
        placeholder={t`select-category`}
        classHolder={"text-orange"}
        classChevron={styles.chevron}
        options={[
          { title: t`all_categories`, value: "" },
          { title: t`news`, value: "News" },
          { title: t`notice`, value: "Notice" },
          { title: t`promotion`, value: "Promotion" },
        ]}
        onChange={handleChange}
        showFullHeight
        defaultValue={category}
      />
      <button
        onClick={handleReadAllNotification}
        className={classNames("text-sm flex mr-4 sm:mr-0", styles.maskAll)}
      >{t`mask_all_as_read`}</button>
    </div>
  );
}
