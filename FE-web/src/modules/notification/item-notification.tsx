import classNames from "classnames";
import cls from "./style.module.css";
import { NotificationModel } from "src/feature/notifications/type";
import dayjs from "dayjs";

export default function ItemNotification({
  fulldetail,
  notify,
  handleReadNotification,
}: {
  fulldetail?: boolean;
  notify: NotificationModel;
  handleReadNotification?: (id: string) => void;
}) {
  const handleClick = () => {
    if (notify.state === "unRead") {
      handleReadNotification?.(notify._id);
    }
    if (notify.hyperlink) {
      window.location.href = notify.hyperlink;
    }
  };
  return (
    <div className={classNames(cls.notifyContainer, "cursor-pointer")} onClick={handleClick}>
      <div className="flex items-center">
        <div className={`${!fulldetail && "truncate"} text-base text-black-dark font-Regular`}>
          {notify.topic}
        </div>
        <div className={`${notify.state === "Read" ? "hidden" : cls.unreadNotify} ml-5`} />
      </div>
      <div
        className={classNames(
          fulldetail ? cls.notifyDetailsPage : cls.notifyDetails,
          "text-sm text-lighterGray",
        )}
      >
        {notify.detail}
      </div>
      <div className="text-sm mt-1 font-medium text-brown">
        {dayjs(notify.publishDate).format("DD-MM-YYYY hh:mm A")}
      </div>
    </div>
  );
}
