import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { Input } from "src/components";
import { UploadSigleImage } from "src/components/upload-image-video/upload-single-image";
import { getImageByKey } from "src/services/upload-image.services";

interface UploadBannerType {
  BannerName: string;
  className?: string;
  setImage?: (file: File) => void;
  defaultBg?: string | null;
  formik: any;
  formName: string;
}

export function UploadBanner({
  BannerName,
  className,
  setImage,
  defaultBg = null,
  formik,
  formName,
}: UploadBannerType) {
  const { t } = useTranslation("common");
  const classContainer = clsx(className && className, "w-6/12");
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  useEffect(() => {
    const getImageURL = async (key: any) => {
      const url = await getImageByKey({ key });
      setUrlPreview(encodeURI(url));
    };
    if (defaultBg) {
      getImageURL(defaultBg);
    }
  }, [defaultBg]);

  const dimensionTitle = useMemo(
    () =>
      formName !== "mobileBanner"
        ? `${t("dimension")}: 1920x484px`
        : `${t("dimension")}: 343x150px`,
    [formName, t],
  );

  const dimension = useMemo(
    () =>
      formName !== "mobileBanner" ? { width: 1920, height: 484 } : { width: 343, height: 150 },
    [formName],
  );

  return (
    <div className={classContainer}>
      <span className="block mb-2 text-base text-black required">{BannerName}</span>
      <UploadSigleImage
        name={t`upload-the-image-or-video`}
        setImage={setImage}
        urlDefaultPreview={urlPreview}
        dimension={dimension}
      />
      <Input
        name={formName}
        className="hidden-input"
        type="number"
        value={formik.values[formName]}
        errorMessage={
          formik.touched[formName] && formik.errors[formName]
            ? t(formik.errors[formName] as "to_ship")
            : ""
        }
      />
      <span className="block my-2 text-base text-black">{t("recommendation")}</span>
      <p className="text-xs">{dimensionTitle}</p>
      <p className="text-xs">{t("support-file-img")}</p>
      <p className="text-xs">{t("max-file-size-img")}</p>
    </div>
  );
}
