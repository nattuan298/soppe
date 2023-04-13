import { Fragment, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Popover } from "@material-ui/core";
import { readPageNotification, resetNotification } from "src/store/notification.slice";
import {
  fetchCountAllUnreadNotification,
  fetchInternalNotificationList,
} from "src/store/notification.action";
import { readNotificationService } from "src/services/notification.services";
import { RootState } from "src/store";
import { ViewNotifications } from "src/modules/notification";
import { useDebounceValue } from "src/hooks";
import { BellIcon } from "../icons";

export default function NotifyIcon() {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("all");
  const location = useLocation();

  const { countAllUnreadNotifications, internalNotifications, internalLoading } = useSelector(
    (state: RootState) => state.notification,
  );

  const dispatch = useDispatch();

  const { data, total } = internalNotifications;

  const focusEvent = useCallback(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken;
    if (isLoggedIn) {
      dispatch(fetchCountAllUnreadNotification());
    }
  }, [dispatch]);

  const focusEventDebouce = useDebounceValue(focusEvent, 3000);
  useEffect(() => {
    window.addEventListener("visibilitychange", focusEventDebouce);
    return () => {
      window.removeEventListener("visibilitychange", focusEventDebouce);
    };
  }, [focusEventDebouce]);

  useEffect(() => {
    dispatch(fetchCountAllUnreadNotification());
  }, [dispatch]);

  useEffect(() => {
    if (open) {
      setOpen(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = () => {
      const params = { page, pageSize: 20, category: category === "all" ? "" : category };
      dispatch(fetchInternalNotificationList(params));
    };
    if (open) {
      fetchData();
    }
  }, [dispatch, page, category, open]);

  const handleCloseNavigation = () => {
    dispatch(resetNotification());
    setOpen(null);
  };

  const showNavigation = (event: MouseEvent<HTMLElement>) => {
    setCategory("all");
    setOpen(event.currentTarget);
    setPage(1);
  };

  const handleChangeCategory = (value: string) => {
    if (value !== category) {
      dispatch(resetNotification());
      setCategory(value);
      setPage(1);
    }
  };

  const getMoreNotifications = async () => {
    setPage((page) => page + 1);
  };

  const hasMore = useMemo(() => data.length < total, [data, total]);

  const handleReadNotification = async (id: string) => {
    const response = await readNotificationService(id);
    if (response.statusCode) {
      return;
    }
    dispatch(readPageNotification(id));
    dispatch(fetchCountAllUnreadNotification());
  };

  return (
    <Fragment>
      <div className="notification relative mr-7.5 cursor-pointer" onClick={showNavigation}>
        <BellIcon />
        <span
          className={`${countAllUnreadNotifications === 0 ? "hidden" : ""}
           badge absolute flex justify-center items-center rounded-full bg-red-light text-white`}
        >
          {countAllUnreadNotifications < 99 ? countAllUnreadNotifications : "99+"}
        </span>
      </div>
      <Popover
        id="navigation-notify"
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
          horizontal: "right",
        }}
        disableScrollLock={true}
      >
        <div className="w-96">
          <ViewNotifications
            classContentName="h-30"
            hasMore={hasMore}
            category={category}
            notifications={data}
            loading={internalLoading}
            handleChangeCategory={handleChangeCategory}
            getMoreNotifications={getMoreNotifications}
            handleReadNotification={handleReadNotification}
          />
        </div>
      </Popover>
    </Fragment>
  );
}
