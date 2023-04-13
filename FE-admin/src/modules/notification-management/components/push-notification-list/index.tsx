import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { notifyToast } from "src/constants/toast";
import { RootState } from "src/store";
import { GenericTable as Table } from "src/components/generic-table";
import { fetchNotificationList } from "src/store/notification.action";
import { ParamListRequestPushNotificationModel } from "src/types/params-list-request.model";
import { Modal } from "src/components";
import { NotificationModel } from "src/types/notification.model";
import {
  activateNotificationService,
  deactivateNotificationService,
  deleteNotificationService,
} from "src/services/notification.services";
import NotificationListHeader from "./header";
import NotificationListRow from "./row";
import NotificationListNavbar from "./navbar-list";
import "./styles.css";

export default function PushNotificationList() {
  const [params, setParams] = useState<ParamListRequestPushNotificationModel>();
  const [selectedNotification, setSelectedNotification] = useState<NotificationModel | undefined>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { pushNotifications, pushLoading } = useSelector((state: RootState) => state.notification);

  const getData = useCallback(() => {
    if (!params) {
      return;
    }
    const { page, pageSize, channel, keyword, startDate, endDate, target } = params;
    if (page && pageSize) {
      dispatch(
        fetchNotificationList({
          page,
          pageSize,
          keyword,
          target,
          channel,
          startDate,
          endDate,
          sortBy: "createdAt-DESC",
        }),
      );
    }
  }, [dispatch, params]);

  useEffect(() => {
    getData();
  }, [getData]);

  const header = useMemo(() => {
    return <NotificationListHeader />;
  }, []);

  const handleDeleteAction = (data: NotificationModel) => {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedNotification(data);
  };

  const handleChangeStatus = (data: NotificationModel, value: string) => {
    if (value.toUpperCase() !== data.status.toUpperCase()) {
      setSelectedNotification({ ...data, status: value });
      setIsOpenModal(true);
      setConfirmType("action");
    }
  };

  const renderRows = useCallback((notify) => {
    const handleDelete = () => handleDeleteAction(notify);
    return (
      <NotificationListRow
        item={notify}
        handleDelete={handleDelete}
        handleChange={handleChangeStatus}
      />
    );
  }, []);

  const handleCancelConfirm = () => {
    setIsOpenModal(false);
    setSelectedNotification(undefined);
  };

  const handleConfirm = async () => {
    try {
      if (!selectedNotification) {
        return;
      }
      if (confirmType === "action") {
        const { _id = "", status } = selectedNotification;
        const editFucntion =
          status === "active" ? activateNotificationService : deactivateNotificationService;
        const response = await editFucntion(_id);
        if (!response?.statusCode) {
          getData();
        }
      } else if (confirmType === "delete" && selectedNotification._id) {
        const response = await deleteNotificationService(selectedNotification._id);
        if (!response?.statusCode) {
          if (pushNotifications.data.length === 1) {
            if (params && params.page && params.page > 1) {
              const pathname = location.pathname;
              history.push({ pathname, search: `?page=${params.page - 1}` });
            } else {
              getData();
            }
          } else {
            getData();
          }
        }
      }
      setIsOpenModal(false);
      setSelectedNotification(undefined);
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
      setIsOpenModal(false);
    }
  };

  return (
    <Fragment>
      <Table
        header={header}
        renderRow={renderRows}
        FilterComponent={NotificationListNavbar}
        results={pushNotifications.data}
        setParams={setParams}
        loading={pushLoading}
        total={Math.ceil(pushNotifications.total / pushNotifications.limit)}
      />
      <Modal
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}
