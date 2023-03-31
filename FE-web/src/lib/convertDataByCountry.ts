import { listBranchSelect, listBranchThaiSelect } from "src/feature/help-center/types";

export interface ItemArraySelect {
  _id: string;
  name: string;
  nameEng: string;
}

export const convertDataByCountry = ({
  data,
  country,
}: {
  data: Array<ItemArraySelect>;
  country: string | undefined;
}) => {
  if (country === "th") {
    return data?.map((item) => ({
      title: item.name,
      value: item._id,
    }));
  }

  return data?.map((item) => ({
    title: item.nameEng,
    value: item._id,
  }));
};

export const convertDataByBranch = ({
  data,
  country,
}: {
  data: listBranchSelect[] | listBranchThaiSelect[];
  country: string | undefined;
}) => {
  if (country === "Thailand") {
    return data?.map((item: listBranchThaiSelect) => ({
      name: item.name,
      _id: item._id,
      phoneNumbers: item.phoneNumbers,
      address: item.address,
      businessHours: item.businessHours,
      latitude: item.latitude,
      longitude: item.longitude,
      provinceId: item.provinceId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      __v: item.__v,
      phoneCode: item.phoneCode,
    }));
  }

  return data?.map((item: listBranchSelect) => ({
    name: item.nameEng,
    _id: item._id,
    phoneNumbers: item.phoneNumbers,
    address: item.addressEng,
    businessHours: item.businessHoursEng,
    latitude: item.latitude,
    longitude: item.longitude,
    provinceId: item.provinceId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    __v: item.__v,
    phoneCode: item.phoneCode,
  }));
};
