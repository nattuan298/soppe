/* eslint-disable no-debugger */
import { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { AddPhoto } from "../icons";
import { notifyToast } from "src/constants/toast";
import { uploadImageFull } from "src/services/upload.services";
import "./styles.css";
import { useDispatch } from "react-redux";
import { changeImageAvatar } from "src/store/internal-user.slice";
import { getUrlAvatar } from "src/store/internal-user.action";

interface UploadProfileImageProps {
  id?: string;
  avatarUrl?: string;
  profile?: boolean;
  onChangeUpload?: (value: string) => void;
}

export function UploadProfileImage({
  id,
  avatarUrl,
  profile,
  onChangeUpload,
}: UploadProfileImageProps) {
  const [imgUrl, setImgUrl] = useState<any>("");
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  async function handleChangeUpload(event: ChangeEvent<HTMLInputElement>) {

    if (event.currentTarget.files?.length) {
      const fileType = event.currentTarget.files[0].type.split("/")[0];
      if (fileType !== "image") {
        notifyToast("error", "invalid-format-file", t);
        return;
      }
      const file = event.currentTarget.files[0];
      const response = await uploadImageFull({ moduleName: "avatar", file });
      setImgUrl(response.imageUrl);
      onChangeUpload && onChangeUpload(response.key);
      if (profile) {
        dispatch(
          getUrlAvatar({
            id: JSON.parse(localStorage.getItem("token") || "{}")._id,
            avatar: response.key,
          }),
        );
        dispatch(changeImageAvatar(response.imageUrl));
      }
    }
  }

  const optionAvatar = useMemo(() => {
    if (profile) {
      return (
        <div className="flex justify-center items-center">
          <span className="txt-avatar font-medium">
            {JSON.parse(localStorage.getItem("token") || "{}").firstName[0]}
          </span>
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center">
        <AddPhoto />
      </div>
    );
  }, [profile]);

  return (
    <>
      <div className="flex p-10 justify-center items-center flex-col upload-profile-image">
        <label
          className="flex justify-center items-center mb-5"
          htmlFor={id ? id : "profile-image"}
        >
          {imgUrl || avatarUrl ? (
            <img
              className="w-full h-full rounded-full object-cover"
              src={imgUrl || avatarUrl}
              alt="profile"
            />
          ) : (
            optionAvatar
          )}
        </label>
        <p className="txt-click">{t("click-to-upload-profile-image")}</p>
      </div>
      <input
        hidden
        id={id ? id : "profile-image"}
        type="file"
        accept=".jpg,.jpeg,.png"
        name={id ? id : "profile-image"}
        onChange={handleChangeUpload}
      />
    </>
  );
}
