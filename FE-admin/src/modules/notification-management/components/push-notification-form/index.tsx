import { Fragment, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NotificationModel } from "src/types/notification.model";
import dayjs from "dayjs";

import { RootState } from "src/store";
import { notifyToast } from "src/constants/toast";
import {
  createNotificationService,
  editNotificationService,
} from "src/services/notification.services";
import { Button, CollapsibleBlock, Modal } from "src/components";
import { routePushNotificationManagement } from "src/constants/routes";
import { fetchSelectedNotification } from "src/store/notification.action";
import { getParams } from "src/store/router-params.slice";
import PushNotification from "./push-notification";
import PublishInformation from "./publish-information";
import { notificationSchema } from "./schema";
import "./style.css";

export default function PushNotificationForm() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { selectedPushNotification } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(fetchSelectedNotification(id));
    }
  }, [id, dispatch]);

  const initialValues = useMemo(() => {
    if (selectedPushNotification) {
      const { topic, detail, publishDate, category, target, channel, status, hyperlink } =
        selectedPushNotification;
      return { topic, detail, publishDate, category, target, channel, status, hyperlink };
    }

    const nextDay = dayjs().add(1, "day").hour(0).minute(0);
    return {
      hyperlink: "",
      topic: "",
      detail: "",
      publishDate: nextDay.toISOString(),
      category: "",
      target: "",
      channel: [],
      status: "Active",
    };
  }, [selectedPushNotification]) as NotificationModel;

  const redirectPage = () => {
    // const page = sessionStorage.getItem("page-size");
    // if (!page) {
    history.push(routePushNotificationManagement);
    // }
    // return history.push(`${routePushNotificationManagement}?page=${page}`);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    redirectPage();
  };

  const editNotification = async (values: NotificationModel) => {
    try {
      const response = await editNotificationService(id, values);
      if (!response?.statusCode) {
        redirectPage();
      }
    } catch (e: any) {
      notifyToast("error", e.message, t);
    }
  };

  const createNewNotification = async (values: any) => {
    try {
      const response = await createNotificationService(values);
      if (!response?.statusCode) {
        redirectPage();
      }
    } catch (e: any) {
      notifyToast("error", e.message, t);
    }
  };

  const handleSubmit = useMemo(() => (id ? editNotification : createNewNotification), [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: notificationSchema,
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5" heading={t`push-notification`}>
              <PushNotification formik={formik} />
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-6" heading={t`publish-information`}>
              <PublishInformation formik={formik} />
            </CollapsibleBlock>
          </div>
        </div>
        <div className="button-wapper mb-10 flex mt-1.5">
          <Button
            variant="text"
            type="submit"
            className="bg-orange-light text-white h-12 w-84 hover:bg-orange-hover mr-1.5"
          >
            {t`submit`}
          </Button>
          <Button
            variant="text"
            className="bg-white border button-cancel h-12 w-84 ml-6"
            onClick={openModal}
          >
            {t`cancel`}
          </Button>
        </div>
      </form>
      <Modal
        open={isOpenModal}
        confirmType={"cancel"}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}
