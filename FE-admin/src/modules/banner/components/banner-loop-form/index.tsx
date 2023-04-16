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
import { uploadImageFull } from "../../../../services/upload.services";

const DEFAULT_COUNTRY = "Thailand";
interface ParamsType {
  id: string;
}

export function BannerLoopCreateForm() {

  const [status, setStatus] = useState<string>("2");
  const { id } = useParams<ParamsType>();

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
    const { name } = values;
    const statusValue = status === "1" ? "ACTIVE" : "INACTIVE";
    const upload = await uploadImageFull({ file: values.desktopBanner,
      moduleName: "banner" });
    const body = {
      name,
      url: upload.key,
      status: statusValue,
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


  const initialValues = useMemo(() => {
    if (bannerLoopData) {
      const { name, status, url } = bannerLoopData;
      setStatus(status === "ACTIVE" ? "1" : "2");
      return {
        name,
        desktopBanner: url,
      };
    }
    return {
      name: "",
      desktopBanner: "",
    };
  }, [bannerLoopData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalBannerLoop,
  });

  const updateStatus = (value: string | null) => {
    if (value) {
      setStatus(value);
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
            <div className="button-wapper px-5 mb-10 flex">
              <Button
                variant="text"
                type="submit"
                className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover"
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
