import { ItemArraySelect } from "src/types/user.model";

export const convertDataByCountry = ({
  data,
  country,
}: {
  data: Array<ItemArraySelect>;
  country: string | undefined;
}) => {
  if (country === "Thailand") {
    return data?.map((item) => ({
      title: item.name,
      titleEng: item.nameEng,
      value: item._id,
    }));
  }

  return data?.map((item) => ({
    title: item.nameEng,
    titleEng: item.nameEng,
    value: item._id,
  }));
};
