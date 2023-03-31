import InfiniteScroll from "react-infinite-scroll-component";

import HeaderNotify from "./header";
import ItemNotification from "./item-notification";
import { CircularProgress } from "@material-ui/core";
import NoData from "./no-data";
import cls from "./style.module.css";
import { NotificationModel } from "src/feature/notifications/type";

interface PropsType {
  fulldetail?: boolean;
  notifications: Array<NotificationModel>;
  hasMore: boolean;
  loading: boolean;
  classContentName?: string;
  category: string;
  scrollableTarget?: boolean;
  getMoreNotifications?: () => void;
  handleChangeCategory?: (value: string) => void;
  handleReadNotification: (id: string) => void;
}
export default function ViewNotification({
  category,
  loading,
  fulldetail = false,
  hasMore = false,
  notifications,
  classContentName,
  scrollableTarget,
  getMoreNotifications,
  handleChangeCategory,
  handleReadNotification,
}: PropsType) {
  return (
    <div className=" w-full h-full flex flex-col">
      <HeaderNotify handleChangeCategory={handleChangeCategory} category={category} />
      <div
        className={`h-full sm:px-0 px-4	${cls.containerContent} ${classContentName || ""}`}
        id="scrollableDiv"
      >
        {getMoreNotifications ? (
          <InfiniteScroll
            dataLength={notifications.length}
            next={getMoreNotifications}
            hasMore={hasMore}
            loader={null}
            scrollableTarget={scrollableTarget ? "scrollableDiv" : null}
          >
            {notifications.map((item: NotificationModel) => (
              <ItemNotification
                fulldetail={fulldetail}
                key={item._id}
                notify={item}
                handleReadNotification={handleReadNotification}
              />
            ))}
          </InfiniteScroll>
        ) : (
          notifications.map((item: NotificationModel) => (
            <ItemNotification
              fulldetail={fulldetail}
              key={item._id}
              notify={item}
              handleReadNotification={handleReadNotification}
            />
          ))
        )}
        {!loading && notifications.length === 0 && <NoData />}
        {loading && (
          <div className="w-full flex justify-center">
            <CircularProgress size={30} />
          </div>
        )}
      </div>
    </div>
  );
}
