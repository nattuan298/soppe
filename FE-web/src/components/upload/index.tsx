import { FormHelperText, IconButton } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "src/components/svgs";
import { uploadImageFull } from "src/services/upload";
import CloseIcon from "@material-ui/icons/Close";
import { FieldUrlType, initValueFieldUrl } from "src/constants/app";

interface UploadZoneType {
  classNameContainer?: string;
  maxSize?: number;
  onChange?: (params: FieldUrlType) => void;
  onError?: (e: string) => void;
  errorMessage?: string;
  url?: string;
  accept?: string;
  disabled?: boolean;
}

export function UploadZone({
  classNameContainer,
  maxSize = 40000000,
  onChange,
  onError,
  errorMessage,
  url,
  accept = "image/apng, image/bmp, image/jpeg, image/pjpeg, image/png, image/tiff, image/webp, image/x-icon",
  disabled,
}: UploadZoneType) {
  const { t } = useTranslation("common");
  const [file, setFile] = useState(url);

  useEffect(() => {
    setFile(url);
  }, [url]);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: async (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];

      if (!acceptedFile) {
        return onError?.(t`no_support_file_type`);
      }

      if (acceptedFile.size > maxSize) {
        return onError?.(t`image_too_large`);
      }
      try {
        const data = await uploadImageFull({ file: acceptedFile });
        onChange?.(data);
        setFile(data.url);
      } catch (e) {
        onError?.(t`upload_fail`);
      }
    },
    multiple: false,
  });

  const handleRemoveFile = () => {
    setFile("");
    onChange?.(initValueFieldUrl);
  };

  return (
    <div className="relative">
      <div
        {...getRootProps({
          className: `${
            !file && "bg-lighterGray"
          } dropzone h-36 border-2 border-dashed border-gray-200 rounded flex justify-center items-center ${classNameContainer} ${
            !disabled && "cursor-pointer"
          }`,
        })}
      >
        {!disabled && <input {...getInputProps()} />}
        {!file && (
          <div className="flex flex-col justify-center items-center">
            <Upload />
            <span className="text-xs text-lighterGray">{t`common:upload-the-image`}</span>
          </div>
        )}

        {file && <img className="h-full" alt="img" src={file} />}
      </div>
      {!disabled && file && (
        <IconButton className="absolute right-2 top-2" size="small" onClick={handleRemoveFile}>
          <CloseIcon />
        </IconButton>
      )}
      <FormHelperText error>{errorMessage}</FormHelperText>
    </div>
  );
}
