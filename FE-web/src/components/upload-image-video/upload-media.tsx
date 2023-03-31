import { makeStyles } from "@material-ui/core";
import { DropzoneAreaBase, FileObject } from "material-ui-dropzone";
import useTranslation from "next-translate/useTranslation";
import { Fragment, useState } from "react";
import { EXTENSION, FileExtension, MAX_SIZE_IMAGE } from "src/constants/contants";
import { notifyToast } from "src/constants/toast";
import { Modal } from "..";
import { UploadModal } from "../modal/upload-modal";

export const useStyles = makeStyles(() => ({
  root: {
    width: "auto",
    maxWidth: "716px",
    minHeight: "150px",
    height: "150px",
    border: "2px dashed #EBEBEB",
    borderRadius: "5px",
    backgroundColor: "#F4F5FA",
    "& svg": {
      color: "#BCBCBC",
      width: "40px",
      height: "27px",
      marginTop: "-136px",
    },
  },
  text: {
    fontSize: "12px",
    fontFamily: "kanit",
    color: "#BCBCBC",
    marginTop: "82.16px",
  },
}));

interface UploadImageVideoProps {
  name?: string;
  countVideo?: number;
  fileLimit: number;
  addNewMedias: (medias: Array<FileObject>) => void;
}

export function UploadMedia({ name, fileLimit, addNewMedias }: UploadImageVideoProps) {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const [files] = useState<FileObject[]>([]);
  const [rejectFile, setRejectFile] = useState<string[]>([]);
  const [filesImageError, setFilesImageError] = useState<FileObject[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const acceptedFiles: FileExtension[] = ["image/jpeg", "image/png"];
  const [isOpenLimitFile, setIsOpenLimitFile] = useState<boolean>(true);

  const checkSizeImage = (fileObjects: FileObject[]) => {
    const arrayImageError = [];
    const arrayImageAccept: FileObject[] = [];

    for (let i = 0; i < fileObjects.length; i++) {
      const fileType = fileObjects[i].file.type as FileExtension;
      const isImage = EXTENSION.IMG.includes(fileType);
      if (isImage) {
        if (fileObjects[i].file.size > MAX_SIZE_IMAGE) {
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
    return arrayImageAccept;
  };

  const handleOnAdd = async (fileObjs: FileObject[]) => {
    if (fileLimit <= 0) {
      notifyToast("error", "maximum-number-of-total-files-can-upload-is-5", t);
      setIsOpenLimitFile(false);
      return;
    }

    let resultImage: FileObject[] = [];
    try {
      resultImage = await checkSizeImage(fileObjs);
    } catch (error) {}

    addNewMedias(resultImage.splice(0, fileLimit));
  };

  const handleLimitFiles = () => {
    notifyToast("error", "maximum-number-of-total-files-can-upload-is-5", t);
    setIsOpenModal(false);
    return "";
  };

  const handleRejectFiles = (rejectedFile: File): string => {
    setRejectFile((previous) => [...previous, rejectedFile.name]);
    if (!isOpenModal) {
      setIsOpenModal(true);
    }

    return rejectedFile.name;
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setFilesImageError([]);
    setRejectFile([]);
  };

  return (
    <Fragment>
      <DropzoneAreaBase
        fileObjects={files}
        acceptedFiles={acceptedFiles}
        dropzoneClass={classes.root}
        dropzoneParagraphClass={classes.text}
        dropzoneText={name}
        maxFileSize={104857600}
        showPreviews={false}
        showPreviewsInDropzone={false}
        showAlerts={false}
        filesLimit={fileLimit}
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
          filesReject={rejectFile}
          filesImageErrors={filesImageError}
          handleCloseModal={handleCloseModal}
        ></UploadModal>
      </Modal>
    </Fragment>
  );
}
