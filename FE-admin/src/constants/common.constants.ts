import { TFunction } from "i18next";
import { OptionType } from "src/components";
import { FileExtension, FileType } from "src/types/common.modal";

export function getStatus(t: TFunction, hiddenAll?: boolean): OptionType[] {
  const status = [
    {
      title: t("active"),
      value: "Active",
    },
    {
      title: t("inactive"),
      value: "Inactive",
    },
  ];
  if (!hiddenAll) {
    status.unshift({
      title: t("all-statuses"),
      value: "All",
    });
  }
  return status;
}

export const EXTENSIONS: Record<FileType | "ALL", FileExtension[]> = {
  IMG: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  VIDEO: ["video/mp4"],
  ALL: ["image/jpeg", "image/png", "image/gif", "video/mp4"],
};

export const STATUS_LANGUAGE = localStorage.getItem("i18nextLng");

export const COMPLETE = "Complete";
