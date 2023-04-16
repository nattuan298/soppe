import { DropzoneAreaBase, FileObject } from "material-ui-dropzone";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { notifyToast } from "src/constants/toast";
import { MAX_SIZE_IMAGE } from "./constants";
import { useStyles } from "./styles";
import "./styles.css";

interface UploadImageVideoProps {
  name?: string;
  setImage?: (file: File) => void;
  urlDefaultPreview?: string | null | undefined;
  dimension?: { width: number; height: number };
  maxFileSize?: number;
}

export function UploadSigleImage({
  name,
  setImage,
  urlDefaultPreview,
  dimension,
  maxFileSize,
}: UploadImageVideoProps) {
  const [files, setFiles] = useState<FileObject[]>([]);
  const classes = useStyles();
  const refUpload = useRef<HTMLDivElement>(null);
  // promise
  const { t } = useTranslation("common");

  function imageSize(fileObjects: FileObject): Promise<{ width: number; height: number }> {
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileObjects.file);
    img.src = objectUrl;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        resolve({ width, height });
      };
      img.onerror = () => {
        reject(false);
      };
    });
  }
  useEffect(() => {
    if (!refUpload || !refUpload?.current) {
      return;
    }
    let previewData;
    if (files.length > 0) {
      previewData = files[0].data;
    } else if (urlDefaultPreview) {
      previewData = urlDefaultPreview;
    }
    if (previewData) {
      const [dropArea] = refUpload.current.getElementsByClassName(classes.root);
      const [textContainer] = refUpload.current.getElementsByClassName(
        "MuiDropzoneArea-textContainer",
      );
      dropArea.setAttribute(
        "style",
        `background: #F4F5FA url('${previewData}') center no-repeat;background-size: auto 100%;`,
      );
      textContainer.setAttribute("style", "visibility: hidden;");
    }
  }, [files, refUpload, classes, urlDefaultPreview]);
  const checkSizeImage = async (fileObjects: FileObject[]) => {
    const arrayImageAccept: FileObject[] = [];

    if (["image/jpeg", "image/png", "image/gif"].includes(fileObjects[0].file.type)) {
      const imageDimensions = await imageSize(fileObjects[0]);
      if (
        dimension &&
        (imageDimensions.width < 0 || imageDimensions.height < 0)
      ) {
        notifyToast(
          "error",
          `${t("image_dimension_must_be_at_least")}  ${dimension?.width}x${dimension?.height}px.`,
          t,
        );
      } else if (fileObjects[0].file.size > MAX_SIZE_IMAGE) {
        notifyToast("error", "maximum-file-size-limit-image-10MB", t);
      } else {
        arrayImageAccept.push(fileObjects[0]);
      }
    }

    return arrayImageAccept;
  };

  const handleOnAdd = async (fileObjects: FileObject[]) => {
    const resultImage = await checkSizeImage(fileObjects);
    setFiles(resultImage);
    if (resultImage.length > 0 && resultImage[0] && setImage) {
      setImage(resultImage[0].file);
    }
  };

  const handleRejectFiles = (rejectedFile: File) => {
    if (!rejectedFile.type.includes("image")) {
      notifyToast("error", "invalid-format-file", t);
      return "invalid-format-files";
    }
    notifyToast("error", "maximum-file-size-limit-image-10MB", t);
    return "maximum-file-size-limit-image-10MB";
  };

  const handleLimitFiles = (filesLimit: number): string => {
    notifyToast("error", "invalid-format-file", t);
    return "";
  };

  const maxSize = useMemo(() => maxFileSize || MAX_SIZE_IMAGE, [maxFileSize]);

  return (
    <Fragment>
      <div ref={refUpload}>
        <DropzoneAreaBase
          acceptedFiles={["image/*"]}
          dropzoneClass={classes.root}
          dropzoneParagraphClass={classes.text}
          fileObjects={files}
          dropzoneText={name}
          maxFileSize={maxSize}
          showAlerts={false}
          filesLimit={1}
          onAdd={handleOnAdd}
          getDropRejectMessage={handleRejectFiles}
          getFileLimitExceedMessage={handleLimitFiles}
          showPreviews={false}
          showPreviewsInDropzone={false}
        />
      </div>
    </Fragment>
  );
}
