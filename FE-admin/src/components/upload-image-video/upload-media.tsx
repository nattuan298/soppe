import { DropzoneAreaBase, FileObject } from "material-ui-dropzone";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { EXTENSIONS } from "src/constants/common.constants";
import { notifyToast } from "src/constants/toast";
import { FileExtension } from "src/types/common.modal";
import { Modal } from "../portal/modal";
import { MAX_SIZE_IMAGE, MAX_SIZE_VIDEO } from "./constants";
import { useStyles } from "./styles";
import "./styles.css";
import { UploadModal } from "./upload-modal";

export type UploadErrorType = "DIMENSION" | "FILE_SIZE" | "INVALID_FILE";
interface UploadImageVideoProps {
  name?: string;
  countVideo: number;
  fileLimit: number;
  addNewMedias: (medias: Array<FileObject>) => void;
  maxDimensionWidth?: number;
  maxDimensionHeight?: number;
  acceptFiles?: FileExtension[];
  onUploadError?: (errType: UploadErrorType) => void;
  disableModalDefault?: boolean;
}

export function UploadMedia({
  name,
  countVideo,
  fileLimit,
  addNewMedias,
  maxDimensionWidth,
  maxDimensionHeight,
  acceptFiles,
  onUploadError,
  disableModalDefault,
}: UploadImageVideoProps) {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [filesImageError, setFilesImageError] = useState<FileObject[]>([]);
  const [filesVideoError, setFilesVideoError] = useState<FileObject[]>([]);
  const [imageNoAccept, setImageNoAccept] = useState<string[]>([]);
  const [filesReject, setFilesReject] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenLimitFile, setIsOpenLimitFile] = useState<boolean>(true);

  const acceptedFiles = acceptFiles || EXTENSIONS.ALL;

  // promise
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

  const checkSizeImage = async (fileObjects: FileObject[]) => {
    const arrayImageError = [];
    const arrayImageAccept: FileObject[] = [];
    const arrayImageNoAccept: string[] = [];

    for (let i = 0; i < fileObjects.length; i++) {
      const fileType = fileObjects[i].file.type as FileExtension;
      const isImg = EXTENSIONS.IMG.includes(fileType);

      if (isImg) {
        const imageDimensions = await imageSize(fileObjects[i]);
        if (
          imageDimensions.width < (maxDimensionWidth || 650) ||
          imageDimensions.height < (maxDimensionHeight || 650)
        ) {
          arrayImageNoAccept.push(fileObjects[i].file.name);
          if (!isOpenModal) {
            onUploadError && onUploadError("DIMENSION");
            !disableModalDefault && setIsOpenModal(true);
          }
        } else if (fileObjects[i].file.size > MAX_SIZE_IMAGE) {
          arrayImageError.push(fileObjects[i]);
          if (!isOpenModal) {
            onUploadError && onUploadError("FILE_SIZE");
            !disableModalDefault && setIsOpenModal(true);
          }
        } else {
          arrayImageAccept.push(fileObjects[i]);
        }
      }
    }
    setFilesImageError(arrayImageError);
    setImageNoAccept(arrayImageNoAccept);
    return arrayImageAccept;
  };

  const checkSizeVideo = (fileObjects: FileObject[]) => {
    const arrayVideoError = [];
    const arrayVideoAccept: FileObject[] = [];

    for (let i = 0; i < fileObjects.length; i++) {
      if (fileObjects[i].file.type === "video/mp4" && fileObjects[i].file.size > MAX_SIZE_VIDEO) {
        arrayVideoError.push(fileObjects[i]);
        if (!isOpenModal) {
          onUploadError && onUploadError("INVALID_FILE");
          !disableModalDefault && setIsOpenModal(true);
        }
      } else if (
        fileObjects[i].file.type === "video/mp4" &&
        fileObjects[i].file.size <= MAX_SIZE_VIDEO
      ) {
        arrayVideoAccept.push(fileObjects[i]);
      }
      setFilesVideoError(arrayVideoError);
    }
    return arrayVideoAccept;
  };

  const handleOnAdd = async (fileObjects: FileObject[]) => {
    if (fileLimit <= 0) {
      notifyToast("error", "Maximum_number_of_total_files_can_upload_is_10", t);
      setIsOpenLimitFile(false);
      return;
    }

    const countVideoPush = fileObjects.filter((item) => item.file.type === "video/mp4").length;

    let resultImage: FileObject[] = [];
    try {
      resultImage = await checkSizeImage(fileObjects);
    } catch (error) {}

    if (countVideoPush + resultImage.length > fileLimit) {
      notifyToast("error", "Maximum_number_of_total_files_can_upload_is_10", t);
      setIsOpenLimitFile(false);
      return;
    }
    if (countVideo + countVideoPush > 1) {
      notifyToast("error", "maximum_number_of_video_can_upload_is_1", t);
      setIsOpenLimitFile(false);
    } else if (countVideo === 0 && countVideoPush <= 1) {
      const resultVideo = checkSizeVideo(fileObjects);
      const uploadFiles = [...resultImage, ...resultVideo].slice(0, fileLimit);
      addNewMedias(uploadFiles);
      setIsOpenLimitFile(true);
    } else if (countVideo === 1 && countVideoPush === 0) {
      const resultVideo = checkSizeVideo(fileObjects);
      const uploadFiles = [...resultImage, ...resultVideo].slice(0, fileLimit);
      addNewMedias(uploadFiles);
      setIsOpenLimitFile(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setFilesImageError([]);
    setFilesVideoError([]);
    setImageNoAccept([]);
    setFilesReject([]);
  };

  const handleRejectFiles = (rejectedFile: File): string => {
    setFilesReject((prevCount) => [...prevCount, rejectedFile.name]);
    if (!isOpenModal) {
      onUploadError && onUploadError("INVALID_FILE");
      !disableModalDefault && setIsOpenModal(true);
    }
    return rejectedFile.name;
  };

  const handleLimitFiles = (): string => {
    notifyToast("error", "Maximum_number_of_total_files_can_upload_is_10", t);
    setIsOpenLimitFile(false);
    return "";
  };

  return (
    <Fragment>
      <DropzoneAreaBase
        fileObjects={files}
        acceptedFiles={acceptedFiles}
        dropzoneClass={classes.root}
        dropzoneParagraphClass={classes.text}
        dropzoneText={name}
        maxFileSize={20971520000}
        showPreviews={false}
        showPreviewsInDropzone={false}
        showAlerts={false}
        filesLimit={fileLimit || 10}
        onAdd={handleOnAdd}
        getDropRejectMessage={handleRejectFiles}
        getFileLimitExceedMessage={handleLimitFiles}
      ></DropzoneAreaBase>
      <Modal
        isOpen={isOpenModal && isOpenLimitFile}
        onClose={handleCloseModal}
        className="w-96 bg-white rounded-lg"
      >
        <UploadModal
          filesReject={filesReject}
          imageNoAccept={imageNoAccept}
          filesImageErrors={filesImageError}
          filesVideoErrors={filesVideoError}
          handleCloseModal={handleCloseModal}
        ></UploadModal>
      </Modal>
    </Fragment>
  );
}
