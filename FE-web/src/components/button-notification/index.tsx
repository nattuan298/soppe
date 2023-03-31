import { Fragment, MouseEvent, useEffect, useMemo, useState } from "react";
import { Popover } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";

import {
  readNotification,
  readPageNotification,
} from "src/feature/notifications/notification.slice";
import {
  fetchCommonNotifications,
  fetchCountNotificationUnread,
} from "src/feature/notifications/notification.action";
import ViewNotifications from "src/modules/notification";
import { NotiIcon } from "src/components/svg";
import { RootState } from "src/state/store";
import useLoggedIn from "src/hooks/useLoggedIn";

export function ButtonNotification() {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const { t } = useTranslation("common");
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const dispatch = useDispatch();

  const { countUnreadCommon, notificaitonCommon, loadingCommon } = useSelector(
    (state: RootState) => state.notification,
  );

  const { data, total } = notificaitonCommon;
  const { isLoggedIn } = useLoggedIn();

  useEffect(() => {
    const focusEvent = () => {
      if (isLoggedIn) {
        dispatch(fetchCountNotificationUnread());
      }
    };
    window.addEventListener("visibilitychange", focusEvent);
    return () => {
      window.removeEventListener("visibilitychange", focusEvent);
    };
  }, [dispatch, isLoggedIn]);

  const handleCloseNavigation = () => {
    setOpen(null);
  };

  const showNavigation = (event: MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setOpen(event.currentTarget);
    }
  };

  const handleChangeCategory = (value: string) => {
    if (value !== category) {
      setCategory(value);
      setPage(1);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const params = { page, pageSize: 20, category };
      dispatch(fetchCommonNotifications(params));
    };
    if (open) {
      fetchData();
    }
  }, [dispatch, page, category, open]);

  const handleReadNotification = async (id: string) => {
    const response = await readNotification(id);
    if (response.status === 204) {
      dispatch(readPageNotification(id));
      dispatch(fetchCountNotificationUnread());
    }
  };

  const getMoreNotifications = () => {
    setPage((page) => page + 1);
  };

  const hasMore = useMemo(() => data.length < total, [data, total]);

  return (
    <Fragment>
      <button onClick={showNavigation} className="relative p-2 sm:p-0">
        <NotiIcon className="noti-icon mx-auto h-6" />
        <div className="text-xs block">{t`notification`}</div>
        {!!countUnreadCommon && (
          <span className="badge absolute flex justify-center items-center rounded-full bg-red-500 text-white">
            {countUnreadCommon < 99 ? countUnreadCommon : "99+"}
          </span>
        )}
      </button>
      <Popover
        id="navigation-menu"
        className="notification"
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleCloseNavigation}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="w-auto sm:w-96">
          <ViewNotifications
            notifications={data}
            classContentName="h-30"
            category={category}
            hasMore={hasMore}
            scrollableTarget
            handleChangeCategory={handleChangeCategory}
            loading={loadingCommon}
            handleReadNotification={handleReadNotification}
            getMoreNotifications={getMoreNotifications}
          />
        </div>
      </Popover>
    </Fragment>
  );
}
