import { Fragment, useEffect, useMemo, useState } from "react";
import { Button, CollapsibleBlock, Modal } from "src/components";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";
import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";

import { InFormationBanner } from "./information-banner";
import { internalBannerLoop } from "./schema";
import "./style.css";
interface ParamsType {
  id: string;
}

interface SlideFormProps {
  loading: boolean;
  bannerData: InternalBannerLoopModel | null;
  initBannerPage: () => void;
  redirectPage: () => void;
  editBannerService: (body: any) => Promise<void | any>;
  createBannerService: (body: any) => Promise<void | any>;
}

export function BannerSlideForm({
  loading,
  bannerData,
  initBannerPage,
  redirectPage,
  editBannerService,
  createBannerService,
}: SlideFormProps) {
  const [status, setStatus] = useState<string>("2");
  const { id } = useParams<ParamsType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    initBannerPage();
  }, [initBannerPage]);

  const handleSubmit = async (values: any) => {
    const { name, totalDuration } = values;
    if (name === "" || totalDuration === "" || totalDuration <= 0) {
      return;
    }
    const statusValue = status === "1" ? "Active" : "Inactive";
    const body = {
      name,
      duration: totalDuration,
      status: statusValue,
    };
    try {
      let response = null;
      if (id && bannerData) {
        const bannerLoop = { ...bannerData, ...body };
        response = await editBannerService(bannerLoop);
      } else {
        response = await createBannerService(body);
      }
      if (!response?.statusCode) {
        redirectPage();
      }
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  };
  useEffect(() => {
    if (!bannerData || loading) {
      return;
    }
    setStatus(bannerData?.status.toLocaleUpperCase() === "ACTIVE" ? "1" : "2");
  }, [bannerData, loading, t, id]);

  const initialValues = useMemo(() => {
    if (bannerData) {
      const { name, duration: totalDuration } = bannerData;
      return {
        name,
        totalDuration,
      };
    }
    return {
      name: "",
      totalDuration: "",
    };
  }, [bannerData]);

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

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5" heading={t`banner-slide-infomation`}>
              <InFormationBanner
                formik={formik}
                status={status}
                setStatus={updateStatus}
                disableStatus={!id}
              />
            </CollapsibleBlock>
            <div className="button-wapper px-5 mb-10 flex">
              <Button
                variant="text"
                type="submit"
                className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover mr-1.5"
              >
                {t`submit`}
              </Button>
              <Button
                variant="text"
                className="bg-white border button-cancel h-12 w-72 ml-6"
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
