/* eslint-disable indent */
import { Media } from "types/api-response-type";
import dayjs from "dayjs";

export const getThumbimageFromMedia = (media: Media[]) => {
  const imageMedia = media?.find((item) => item?.fileType?.toLocaleLowerCase().includes("image"));
  const defaultMedia =
    media?.length > 0
      ? media[0]
      : {
          fileType: "",
          position: 0,
          url: "",
          urlPreSign: "",
        };
  return imageMedia ? imageMedia : defaultMedia;
};

export const convertTimeToMinute = (time: number) => {
  return dayjs("2021-01-01").second(time).format("mm:ss");
};
