import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Button, CollapsibleBlock, InputDatePicker, Modal } from "src/components";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { routeManagementBannerLoopListBase } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";

import { RootState } from "src/store";
import { InFormationBanner } from "./information-banner";
import {
  createInternalBannerLoopService,
  editInternalBannerLoopService,
} from "src/services/internal-banner-loop.services";
import { fetchSelectedBannerLoop } from "src/store/internal-selected-banner-loop.action";
import { getParams } from "src/store/router-params.slice";
import { internalBannerLoop } from "./schema";

const DEFAULT_COUNTRY = "Thailand";
interface ParamsType {
  id: string;
}

export function BannerLoopCreateForm() {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("2");
  const { id } = useParams<ParamsType>();
  const [showErrorDate, setShowErrorDate] = useState<boolean>(false);
  const [messageDateError, setMessageDateError] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [location, setLocation] = useState(DEFAULT_COUNTRY);

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const date = useMemo(() => new Date(), []);

  const { bannerLoopData, loading } = useSelector(
    (state: RootState) => state.internalSelectedBannerLoop,
  );

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(fetchSelectedBannerLoop(id));
    }
  }, [id, dispatch]);

  const redirectPage = () => {
    const page = sessionStorage.getItem("banner-loop-page");
    if (!page) {
      history.push(routeManagementBannerLoopListBase);
    }
    return history.push(
      `/admin-dashboard/appearance-management/home-banner-management/banner-loop-list?page=${page}`,
    );
  };

  const handleSubmit = async (values: any) => {
    const { name, totalDuration } = values;
    if (
      name === "" ||
      totalDuration === "" ||
      totalDuration <= 0 ||
      !from ||
      !to ||
      date.getTime() - to.getTime() > 86400000
    ) {
      if (!to || !from) {
        setMessageDateError("please_select_banner_publish_period");
        setShowErrorDate(true);
      } else if (date.getTime() - to.getTime() > 86400000) {
        setMessageDateError("you_can't_create_a_banner_loop_in_past_time");
        setShowErrorDate(true);
      } else {
        setShowErrorDate(false);
      }
      return;
    }
    const statusValue = status === "1" ? "ACTIVE" : "INACTIVE";

    const body = {
      name,
      duration: totalDuration,
      startDate: from?.toISOString(),
      endDate: to?.toISOString(),
      status: statusValue,
      countryCode: location,
    };

    try {
      let response = null;
      if (id && bannerLoopData) {
        const bannerLoop = { ...bannerLoopData, ...body };
        response = await editInternalBannerLoopService(bannerLoop);
      } else {
        response = await createInternalBannerLoopService(body);
      }
      if (!response?.statusCode) {
        redirectPage();
      }
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  };
  useEffect(() => {
    if (!bannerLoopData || loading) {
      return;
    }
    setStatus(bannerLoopData?.status === "ACTIVE" ? "1" : "2");
    const { startDate, endDate, countryCode } = bannerLoopData;
    setFrom(new Date(startDate));
    setTo(new Date(endDate));
    setLocation(countryCode || DEFAULT_COUNTRY);
  }, [bannerLoopData, loading, t, id]);

  const initialValues = useMemo(() => {
    if (bannerLoopData) {
      const { name, duration: totalDuration } = bannerLoopData;
      return {
        name,
        totalDuration,
      };
    }
    return {
      name: "",
      totalDuration: "",
    };
  }, [bannerLoopData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalBannerLoop,
  });

  const handleSelectDate = useCallback(
    (startDate, eDate) => {
      const endDate = eDate
        ? new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate(), 23, 59, 59)
        : null;
      setFrom(startDate);
      setTo(endDate);
      if (!endDate || !startDate) {
        setMessageDateError("please_select_banner_publish_period");
        setShowErrorDate(true);
      } else if (date.getTime() - endDate.getTime() > 86400000) {
        setMessageDateError("you_can't_create_a_banner_loop_in_past_time");
        setShowErrorDate(true);
      } else {
        setShowErrorDate(false);
      }
    },
    [date],
  );

  const updateStatus = (value: string | null) => {
    if (value) {
      setStatus(value);
    }
  };

  const checkDateFromTo = () => {
    if (!to || !from) {
      setMessageDateError("please_select_banner_publish_period");
      setShowErrorDate(true);
    } else if (date.getTime() - to.getTime() > 86400000) {
      setMessageDateError("you_can't_create_a_banner_loop_in_past_time");
      setShowErrorDate(true);
    } else {
      setShowErrorDate(false);
    }
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

  const handleChangeLocation = (value: string) => {
    if (value) {
      setLocation(value);
    }
  };

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5" heading={t("banner_loop_information")}>
              <InFormationBanner
                formik={formik}
                status={status}
                location={location}
                disableStatus={!id}
                disableCountry={!!id}
                setStatus={updateStatus}
                handleChangeLocation={handleChangeLocation}
              />
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("publish-date")}>
              <div className="w-6/12 flex mt-2">
                <label className="block w-7/12 mr-2">
                  <span className="block mt-2 mb-1 text-base text-black required">
                    {t`publish-period`}
                  </span>
                  <InputDatePicker
                    handleSelect={handleSelectDate}
                    className="h-12 w-full focus:outline-none ring-gray-300 ring-1 focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
                    defaultFrom={from}
                    defaultTo={to}
                    minDate={new Date()}
                  />
                  {showErrorDate && (
                    <p className="text-sm text-red-light mt-2">
                      {t(messageDateError as "to_ship")}
                    </p>
                  )}
                </label>
              </div>
            </CollapsibleBlock>
            <div className="button-wapper px-5 mb-10 flex">
              <Button
                variant="text"
                type="submit"
                className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover"
                onClick={checkDateFromTo}
              >
                {t`submit`}
              </Button>
              <Button
                variant="text"
                className="bg-white button-cancel h-12 w-72 ml-4 border"
                onClick={openModal}
              >
                {t`cancel`}
              </Button>
            </div>
          </div>
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
