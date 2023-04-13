import { DropzoneAreaBase, FileObject } from "material-ui-dropzone";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";
import { Modal } from "../portal/modal";
import { MAX_SIZE_IMAGE, MAX_SIZE_VIDEO } from "./constants";
import { useStyles } from "./styles";
import "./styles.css";
import { UploadModal } from "./upload-modal";

interface UploadImageVideoProps {
  name?: string;
  fileList?: FileList | null;
}

export function UploadImageVideo({ name }: UploadImageVideoProps) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [filesImageError, setFilesImageError] = useState<FileObject[]>([]);
  const [filesVideoError, setFilesVideoError] = useState<FileObject[]>([]);
  const [imageNoAccept, setImageNoAccept] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenLimitFile, setIsOpenLimitFile] = useState<boolean>(false);
  let countVideoCurrent = 0;

  const checkCountVideo = (): number => {
    countVideoCurrent = 0;
    for (let i = 0; i < files.length; i++) {
      if (files[i].file.type === "video/mp4") {
        countVideoCurrent += 1;
      }
    }
    return countVideoCurrent;
  };

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
      if (fileObjects[i].file.type === "image/jpeg" || fileObjects[i].file.type === "image/png") {
        const imageDimensions = await imageSize(fileObjects[i]);
        if (
          (fileObjects[i].file.type === "image/jpeg" || fileObjects[i].file.type === "image/png") &&
          imageDimensions.width < 650 &&
          imageDimensions.height < 650
        ) {
          arrayImageNoAccept.push(fileObjects[i].file.name);
          if (!isOpenModal) {
            setIsOpenModal(true);
          }
        } else if (
          (fileObjects[i].file.type === "image/jpeg" || fileObjects[i].file.type === "image/png") &&
          fileObjects[i].file.size > MAX_SIZE_IMAGE
        ) {
          arrayImageError.push(fileObjects[i]);
          if (!isOpenModal) {
            setIsOpenModal(true);
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
          setIsOpenModal(true);
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
    let countVideoPush = 0;
    for (let i = 0; i < fileObjects.length; i++) {
      if (fileObjects[i].file.type === "video/mp4") {
        countVideoPush += 1;
      }
    }

    const resultVideo = checkSizeVideo(fileObjects);
    let resultImage: FileObject[] = [];
    try {
      resultImage = await checkSizeImage(fileObjects);
    } catch (error) {}

    if (checkCountVideo() === 0 && countVideoPush <= 1) {
      setFiles([...files, ...resultImage, ...resultVideo]);
      notifyToast("default", "success", t);
    } else if (checkCountVideo() === 1 && countVideoPush === 0) {
      setFiles([...files, ...resultImage, ...resultVideo]);
      notifyToast("default", "success", t);
    } else {
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setFilesImageError([]);
    setFilesVideoError([]);
    setImageNoAccept([]);
  };

  const handleLimitFiles = (filesLimit: number): string => {
    setIsOpenLimitFile(true);
    return `${filesLimit}`;
  };
  const handleCloseModalLimitFile = () => {
    setIsOpenLimitFile(false);
  };

  return (
    <>
      <div>
        <DropzoneAreaBase
          acceptedFiles={
            checkCountVideo()
              ? ["image/jpeg", "image/png"]
              : ["image/jpeg", "image/png", "video/mp4"]
          }
          dropzoneClass={classes.root}
          dropzoneParagraphClass={classes.text}
          fileObjects={files}
          dropzoneText={name}
          maxFileSize={209715200}
          showPreviews={false}
          showPreviewsInDropzone={false}
          showAlerts={false}
          filesLimit={10}
          onAdd={handleOnAdd}
          getFileLimitExceedMessage={handleLimitFiles}
        ></DropzoneAreaBase>
      </div>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="w-96 bg-white rounded-lg">
        <UploadModal
          imageNoAccept={imageNoAccept}
          filesImageErrors={filesImageError}
          filesVideoErrors={filesVideoError}
          handleCloseModal={handleCloseModal}
        ></UploadModal>
      </Modal>
    </>
  );
}
