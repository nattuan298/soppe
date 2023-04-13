import dayjs from "dayjs";

export const convertTimeToMinute = (time: number) => {
  return dayjs("2021-01-01").second(time).format("mm:ss");
};
