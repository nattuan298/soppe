/* eslint-disable indent */
import { FileObject } from "material-ui-dropzone";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WarningIcon } from "../icons";

interface UploadModalProps {
  filesImageErrors: FileObject[];
  filesVideoErrors: FileObject[];
  imageNoAccept: string[];
  filesReject?: string[];
  handleCloseModal: () => void;
}

export function UploadModal({
  filesImageErrors,
  filesVideoErrors,
  handleCloseModal,
  imageNoAccept,
  filesReject,
}: UploadModalProps) {
  const { t } = useTranslation("common");

  const [imageEmpty, setImageEmpty] = useState<boolean>(false);
  const [videoEmpty, setVideoEmpty] = useState<boolean>(false);
  const [imageNoAcceptEmpty, setImageNoAcceptEmpty] = useState<boolean>(false);
  const [filesRejectEmpty, setFilesRejectEmpty] = useState<boolean>(false);

  const handleOnClick = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (filesImageErrors && filesImageErrors[0]) {
      setImageEmpty(true);
    }
    if (filesVideoErrors && filesVideoErrors[0]) {
      setVideoEmpty(true);
    }
    if (imageNoAccept && imageNoAccept[0]) {
      setImageNoAcceptEmpty(true);
    }
    if (filesReject && filesReject[0]) {
      setFilesRejectEmpty(true);
    }
  }, [filesImageErrors, filesVideoErrors, imageNoAccept, filesReject]);

  const resolveCharacter = (files: FileObject[]): string[] => {
    let newFiles: string[] = [];
    files.map((file: FileObject) => {
      let newName: string = "";
      if (file.file.name.length > 30) {
        for (let i = 0; i < 10; i++) {
          newName += file.file.name[i];
        }
        newName += "...";
        for (let i = file.file.name.length - 10; i < file.file.name.length; i++) {
          newName += file.file.name[i];
        }

        newFiles = [...newFiles, newName];
      } else {
        newFiles = [...newFiles, file.file.name];
      }
      newName = "";
      return 0;
    });

    return newFiles;
  };

  const resolveCharacterImageNoAccept = (files: string[]): string[] => {
    let newFiles: string[] = [];
    for (let i = 0; i < files.length; i++) {
      let newName: string = "";
      if (files[i].length > 30) {
        for (let j = 0; j < 10; j++) {
          newName += files[i][j];
        }
        newName += "...";
        for (let j = files[i].length - 10; j < files[i].length; j++) {
          newName += files[i][j];
        }
        newFiles = [...newFiles, newName];
      } else {
        newFiles = [...newFiles, files[i]];
      }
      newName = "";
    }

    return newFiles;
  };

  const nameImageError = resolveCharacter(filesImageErrors);
  const nameVideoError = resolveCharacter(filesVideoErrors);
  const nameImageNoAccept = resolveCharacterImageNoAccept(imageNoAccept);
  const nameFilesReject = resolveCharacterImageNoAccept(filesReject || []);

  return (
    <div className="p-7">
      <div className="grid justify-items-center">
        <WarningIcon />
      </div>
      <div className="mt-6">
        <label>
          {filesRejectEmpty ? <p className="text-sm font-bold">{t`supported-file-type`}</p> : null}
          {filesRejectEmpty ? (
            <div className="">
              <label>
                <span className="text-sm font-bold">{t`invalid-format-files`}&nbsp;</span>
              </label>
              {nameFilesReject
                ? nameFilesReject.map((nameReject: string) => (
                    <li className="text-sm">{nameReject}</li>
                  ))
                : null}
            </div>
          ) : null}

          {imageEmpty || videoEmpty ? (
            <p className="text-sm mt-2 font-bold">{t`maximum-size-for-image-is-10mb-video-is-200mb`}</p>
          ) : null}
          {imageEmpty || videoEmpty ? (
            <>
              <div className="">
                <label>
                  <span className="text-sm font-bold">{t`maximum-size-exceeded-files`}</span>
                </label>
                {nameImageError
                  ? nameImageError.map((nameImage: string) => (
                      <li className="text-sm">{nameImage}</li>
                    ))
                  : null}
                {nameVideoError
                  ? nameVideoError.map((nameVideo: string) => (
                      <li className="text-sm">{nameVideo}</li>
                    ))
                  : null}
              </div>
            </>
          ) : null}

          {imageNoAcceptEmpty ? (
            <p className="text-sm mt-2 font-bold">{t`image-dimension-must-be-at-least-650x650px`}</p>
          ) : null}
          {imageNoAcceptEmpty ? (
            <div className="">
              <label>
                <span className="text-sm font-bold">{t`image-does-not-meet-minimum-requirement`}</span>
              </label>
              {nameImageNoAccept
                ? nameImageNoAccept.map((nameImage: string) => (
                    <li className="text-sm">{nameImage}</li>
                  ))
                : null}
            </div>
          ) : null}
        </label>
      </div>

      <div className="w-full h-12 mt-6">
        <button
          className="w-full h-full bg-orange-light hover:bg-orange-hover text-white rounded-md"
          onClick={handleOnClick}
        >
          {t`ok`}
        </button>
      </div>
    </div>
  );
}
