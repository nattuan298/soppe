/* eslint-disable indent */
import { FileObject } from "material-ui-dropzone";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { ButtonMui } from "..";
import WarningIcon from "../svgs/Warning";

interface UploadModalProps {
  filesImageErrors: FileObject[];
  imageNoAccept?: string[];
  filesReject?: string[];
  handleCloseModal: () => void;
}

export function UploadModal({
  filesImageErrors,
  handleCloseModal,
  imageNoAccept,
  filesReject,
}: UploadModalProps) {
  const { t } = useTranslation("common");

  const [imageEmpty, setImageEmpty] = useState<boolean>(false);
  const [filesRejectEmpty, setFilesRejectEmpty] = useState<boolean>(false);

  const handleOnClick = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (filesImageErrors && filesImageErrors[0]) {
      setImageEmpty(true);
    }
    if (filesReject && filesReject[0]) {
      setFilesRejectEmpty(true);
    }
  }, [filesImageErrors, imageNoAccept, filesReject]);

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

          {imageEmpty ? (
            <p className="text-sm mt-2 font-bold">{t`maximum-size-for-image-is-10mb`}</p>
          ) : null}
          {imageEmpty ? (
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
              </div>
            </>
          ) : null}
        </label>
      </div>

      <div className="w-full h-12 mt-6">
        <ButtonMui onClick={handleOnClick}>{t`ok`}</ButtonMui>
      </div>
    </div>
  );
}
