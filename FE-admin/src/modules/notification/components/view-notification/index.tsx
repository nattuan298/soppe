import InfiniteScroll from "react-infinite-scroll-component";

import { InternalNotificationModel } from "src/types/notification.model";
import HeaderNotify from "./header";
// import { LoadingIndicator } from "src/components/animation/loading-indicator";
import { Spinner } from "src/components";
import ItemNotification from "./item-notification";
import NoData from "./no-data";
import "./style.css";

interface PropsType {
  notifications: Array<InternalNotificationModel>;
  hasMore: boolean;
  loading: boolean;
  classContentName?: string;
  category: string;
  getMoreNotifications?: () => void;
  handleChangeCategory?: (value: string) => void;
  handleReadNotification?: (id: string) => void;
}

export default function ViewNotification({
  category,
  notifications,
  classContentName,
  hasMore,
  loading,
  getMoreNotifications,
  handleReadNotification,
  handleChangeCategory,
}: PropsType) {
  return (
    <div className="w-full h-full flex flex-col ml-0.5">
      <HeaderNotify category={category} handleChangeCategory={handleChangeCategory} />
      <div
        className={`mt-1 h-full container-content ${classContentName || ""}`}
        id="scrollableTarget"
      >
        {loading && (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        )}
        {!loading && notifications.length === 0 && <NoData />}
        {getMoreNotifications ? (
          <InfiniteScroll
            dataLength={notifications.length}
            next={getMoreNotifications}
            hasMore={hasMore}
            loader={null}
            scrollableTarget="scrollableTarget"
          >
            {notifications.map((item: InternalNotificationModel) => (
              <ItemNotification
                key={item._id}
                notify={item}
                handleReadNotification={handleReadNotification}
              />
            ))}
          </InfiniteScroll>
        ) : (
          notifications.map((item: InternalNotificationModel) => (
            <ItemNotification
              key={item._id}
              notify={item}
              handleReadNotification={handleReadNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}
