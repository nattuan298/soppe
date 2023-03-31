import { CenterType } from "src/modules/help-center/components/map-google/index";

export const MAX_SIZE_IMAGE: number = 10485760;
export const MAX_SIZE_VIDEO: number = 209715200;

export type FileType = "IMG" | "VIDEO";
export type FileExtension = "image/jpeg" | "image/png" | "image/jpg" | "image/gif" | "video/mp4";

export const EXTENSION: Record<FileType | "ALL", FileExtension[]> = {
  IMG: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  VIDEO: ["video/mp4"],
  ALL: ["image/jpeg", "image/png", "image/gif", "video/mp4"],
};

export const MAP_HEADQUARTER: CenterType = { lat: 13.8299014, lng: 100.5611939 };
