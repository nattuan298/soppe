import { Fragment, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { RootState } from "src/store";
import { notifyToast } from "src/constants/toast";
import { Button, CollapsibleBlock, Modal } from "src/components";
import { fetchBannerSliceSectionSelected } from "src/store/internal-banners.action";
import { InformationBanner } from "./information";
import { UploadBanner } from "./upload-banner";
import { getParams } from "src/store/router-params.slice";
import { internalBanner } from "./schema";
import { uploadImageFull } from "src/services/upload-image.services";
import {
  createInternalBannerSectionService,
  editInternalBannerSectionService,
} from "src/services/internal-banner.services";
import "./style.css";

interface PropsType {
  isEditMode?: boolean;
}
interface ParamsType {
  id: string;
}

export function SectionBannerForm({ isEditMode }: PropsType) {
  const [status, setStatus] = useState<string>("1");
  const [desktopBanner, setDesktopBanner] = useState<File | null>(null);
  const [tabletBanner, setTabletBanner] = useState<File | null>(null);
  const [mobileBanner, setMobileBanner] = useState<File | null>(null);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { id } = useParams<ParamsType>();
  const { t } = useTranslation("common");
  const history = useHistory();
  const dispatch = useDispatch();

  const { selectedBanner, internalBannerData } = useSelector(
    (state: RootState) => state.internalBanners,
  );

  useEffect(() => {
    dispatch(getParams(id));
    if (isEditMode) {
      dispatch(fetchBannerSliceSectionSelected(id));
    } else if (!internalBannerData.page) {
      history.push(
        `/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/${id}`,
      );
    }
  }, [id, isEditMode, internalBannerData, history, dispatch]);

  const {
    desktopBanner: desktopBg,
    tabletBanner: tabletBg,
    mobileBanner: mobileBg,
  } = useMemo(() => {
    if (selectedBanner) {
      return selectedBanner;
    }
    return { desktopBanner: null, tabletBanner: null, mobileBanner: null };
  }, [selectedBanner]);

  const initialValues = useMemo(() => {
    if (selectedBanner) {
      const { name, hyperlink, desktopBanner, tabletBanner, mobileBanner } = selectedBanner;
      return { name, hyperlink, desktopBanner, tabletBanner, mobileBanner };
    }
    return {
      name: "",
      hyperlink: "",
      desktopBanner: "",
      tabletBanner: "",
      mobileBanner: "",
    };
  }, [selectedBanner]);

  const createBanner = async (values: any) => {
    const { name, hyperlink } = values;
    const statusValue = status === "1" ? "Active" : "Inactive";
    const position =
      internalBannerData.data.length === 0
        ? 1
        : Math.max(...internalBannerData.data.map(({ position }) => position)) + 1;
    if (!name || name === "" || !desktopBanner || !tabletBanner || !mobileBanner) {
      return;
    }
    setIsSubmiting(true);
    const banners = [desktopBanner, tabletBanner, mobileBanner].map((file) =>
      uploadImageFull({ file, moduleName: "banner" }),
    );
    const keys = await Promise.all(banners);
    const fileName = mobileBanner.name;
    const match = /.*\.(.+)/.exec(fileName);
    const suffix = match && match[1];
    const [firstChar, ...restChar] = mobileBanner.type;
    const imageType = suffix
      ? `image/${suffix}`
      : firstChar.toUpperCase() + restChar.join("").toLocaleLowerCase();

    const body = {
      desktopBanner: keys[0],
      tabletBanner: keys[1],
      mobileBanner: keys[2],
      name,
      hyperlink,
      status: statusValue,
      bannerLoop: id,
      imageType,
      position,
    };
    try {
      const response = await createInternalBannerSectionService(body);
      if (!response?.statusCode) {
        history.push(
          `/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/${id}`,
        );
      }
      setIsSubmiting(false);
    } catch (e: any) {
      setIsSubmiting(false);
      notifyToast("error", e.message, t);
    }
  };

  const getBanner = async (newFile: File | null, defaultkey: string) => {
    if (newFile) {
      const key = await uploadImageFull({ file: newFile, moduleName: "banner" });
      return key;
    }
    return defaultkey;
  };
  const editBanner = async (values: any) => {
    const statusValue = status === "1" ? "Active" : "Inactive";
    const { name, hyperlink } = values;
    if (!name || name === "" || !selectedBanner) {
      return;
    }
    setIsSubmiting(true);
    let { imageType } = selectedBanner;

    if (mobileBanner) {
      const fileName = mobileBanner.name;
      const match = /.*\.(.+)/.exec(fileName);
      const suffix = match && match[1];
      const [firstChar, ...restChar] = mobileBanner.type;
      imageType = suffix
        ? `image/${suffix}`
        : firstChar.toUpperCase() + restChar.join("").toLocaleLowerCase();
    }
    const desktopBannerValue = await getBanner(desktopBanner, selectedBanner.desktopBanner);
    const tabletBannerValue = await getBanner(tabletBanner, selectedBanner.tabletBanner);
    const mobileBannerValue = await getBanner(mobileBanner, selectedBanner.mobileBanner);
    const editBanner = {
      ...selectedBanner,
      name,
      hyperlink,
      imageType,
      status: statusValue,
      desktopBanner: desktopBannerValue,
      tabletBanner: tabletBannerValue,
      mobileBanner: mobileBannerValue,
    };
    try {
      const response = await editInternalBannerSectionService(editBanner);
      if (!response?.statusCode) {
        history.push(
          `/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/${selectedBanner.bannerLoop}`,
        );
      }
      setIsSubmiting(false);
    } catch (e: any) {
      setIsSubmiting(false);
      notifyToast("error", e.message, t);
    }
  };

  const handleSubmit = (values: any) => {
    if (isEditMode) {
      editBanner(values);
    } else {
      createBanner(values);
    }
  };
  useEffect(() => {
    if (!selectedBanner) {
      return;
    }
    setStatus(selectedBanner?.status.toLocaleUpperCase() === "ACTIVE" ? "1" : "2");
  }, [selectedBanner]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalBanner,
  });

  const updateStatus = (value: string | null) => {
    if (value) {
      setStatus(value);
    }
  };

  const setNewDesktopBanner = (file: File) => {
    setDesktopBanner(file);
    formik.setFieldValue("desktopBanner", file.name);
  };

  const setNewTabletBanner = (file: File) => {
    setTabletBanner(file);
    formik.setFieldValue("tabletBanner", file.name);
  };

  const setNewMobileBanner = (file: File) => {
    setMobileBanner(file);
    formik.setFieldValue("mobileBanner", file.name);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    const idBannerLoop = selectedBanner?.bannerLoop || id;
    history.push(
      `/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/${idBannerLoop}`,
    );
  };

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5" heading={t("banner_information")}>
              <InformationBanner formik={formik} status={status} setStatus={updateStatus} />
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t("banner_contents")}>
              <UploadBanner
                BannerName={t("desktop_size_banner")}
                className="upload-image"
                setImage={setNewDesktopBanner}
                defaultBg={desktopBg}
                formName={"desktopBanner"}
                formik={formik}
              />
              <UploadBanner
                BannerName={t("tablet_size_banner")}
                className="mt-10 upload-image"
                setImage={setNewTabletBanner}
                defaultBg={tabletBg}
                formName={"tabletBanner"}
                formik={formik}
              />
              <UploadBanner
                BannerName={t("mobile_size_banner")}
                className="mt-10 upload-image"
                setImage={setNewMobileBanner}
                defaultBg={mobileBg}
                formName={"mobileBanner"}
                formik={formik}
              />
            </CollapsibleBlock>
            <div className="button-wapper px-5 mb-10 flex items-center">
              <Button
                loading={isSubmiting}
                loadingSize={20}
                variant="text"
                className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover"
                type="submit"
              >
                {t`submit`}
              </Button>
              <Button
                variant="text"
                className="bg-white button-cancel border h-12 w-72 ml-4 "
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
