/* eslint-disable indent */
import { useEffect, useState } from "react";
import { FileObject } from "material-ui-dropzone";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { UploadErrorType, UploadMedia } from "src/components/upload-image-video/upload-media";
import { ImageVideo } from "src/modules/product/components/product-update/image-video";
import { Media, MediaObject } from "src/modules/product/components/product-update/types";
import { Label, Modal } from "src/components";
import { EXTENSIONS } from "src/constants/common.constants";
import { notifyToast } from "src/constants/toast";

interface PreviewImageVideoProps {
  defaultMedia?: string;
  onChangeMedia: (media: File | null) => void;
}

export function UploadPreviewMedia({ defaultMedia, onChangeMedia }: PreviewImageVideoProps) {
  const [selectedMedida, setSelectedMedida] = useState<Media | MediaObject | null>();
  const [isVisibleErrModal, setIsVisibleErrModal] = useState<boolean>(false);
  const [contentText, setContentText] = useState("");

  useEffect(() => {
    setSelectedMedida(
      defaultMedia
        ? {
            _id: uuidv4(),
            fileType: "IMAGE",
            urlPreSign: defaultMedia,
            url: defaultMedia,
            position: 1,
          }
        : null,
    );
  }, [defaultMedia]);

  const { t } = useTranslation("common");

  const addNewMedias = (files: Array<FileObject>) => {
    const addMedias = files.map((item) => ({
      _id: uuidv4(),
      urlPreSign: item.data,
      fileType: item.file.type.includes("video") ? "VIDEO" : "IMAGE",
      position: 0,
      ...item,
    }));
    onChangeMedia(files.length > 0 ? addMedias[0].file : null);
    setSelectedMedida(addMedias[0]);
  };

  function handleUploadError(errType: UploadErrorType) {
    if (errType === "INVALID_FILE") notifyToast("error", t("invalid-format-file"), t);
    if (errType === "FILE_SIZE") {
      setIsVisibleErrModal(true);
      setContentText("Upload failed. File must not exceed 10MB!");
    }
    if (errType === "DIMENSION") {
      setIsVisibleErrModal(true);
      setContentText(
        "Upload failed. The image is too small. The minimum dimension is 603x603 pixels.",
      );
    }
  }

  return (
    <div className="pl-1">
      <Label required>{t("article-main-image")}</Label>
      <div className="mt-1">
        <UploadMedia
          name={t`upload-the-image`}
          addNewMedias={addNewMedias}
          countVideo={1}
          fileLimit={1}
          maxDimensionWidth={603}
          maxDimensionHeight={603}
          acceptFiles={EXTENSIONS.IMG}
          disableModalDefault={true}
          onUploadError={handleUploadError}
        />
      </div>
      <div className="mt-2.5">
        <label>
          <p className="txt-style-medium text-base">{t("recommendation")}</p>
          <p className="text-xs mt-0.5">{t("min-dimmendation-article")}</p>
          <p className="text-xs">{t("support-file-img")}</p>
          <p className="text-xs">{t("max-file-size-img")}</p>
        </label>
      </div>
      {selectedMedida && (
        <div>
          <div className="mt-7">
            <span className="txt-style-medium text-sm pl-2.5">{t("selected-img")}</span>
          </div>

          <div className="w-[200px] h-[200px] object-contain">
            <ImageVideo
              className="h-[200px] border border-dashed border-warmGray-300"
              removeIconClass="top-[-7px] right-[-7px]"
              item={selectedMedida}
              handleRemove={() => {
                onChangeMedia(null);
                setSelectedMedida(null);
              }}
            />
          </div>
        </div>
      )}
      <Modal
        content={contentText}
        open={isVisibleErrModal}
        confirmType={"confirm"}
        confirmText={t("ok")}
        onConfirm={() => setIsVisibleErrModal(false)}
      />
    </div>
  );
}
