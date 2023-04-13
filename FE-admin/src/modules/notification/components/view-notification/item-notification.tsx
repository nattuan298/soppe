import { InternalNotificationModel } from "src/types/notification.model";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { routesOrderManagement, routesUserManagement } from "src/constants/routes";

export default function ItemNotification({
  notify,
  handleReadNotification,
}: {
  notify: InternalNotificationModel;
  handleReadNotification?: (id: string) => void;
}) {
  const history = useHistory();

  const handleClick = async () => {
    if (notify.state === "unRead") {
      await handleReadNotification?.(notify._id);
    }
    if (notify.type) {
      if (notify.type === "REGISTER") {
        history.push(routesUserManagement);
      } else if (notify.type === "PAYMENT") history.push(routesOrderManagement);
    }
  };

  return (
    <div className="notify-container cursor-pointer" onClick={handleClick}>
      <div className="text-base text-textSearch-light font-semibold flex items-center">
        <div className="truncate">{notify.topic}</div>
        <div className={`w-1/6 ${notify.state === "Read" ? "hidden" : ""}`}>
          <div className="unread-notify ml-5" />
        </div>
      </div>
      <div className="text-sm notify-details">{notify.detail}</div>
      <div className="text-sm mt-1 font-medium text-gray-dark">
        {dayjs(notify.publishDate).format("DD-MM-YYYY hh:mm A")}
      </div>
    </div>
  );
}
