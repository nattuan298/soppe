import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";

export const getImageByKey = async ({ key }: { key: string }) => {
  const res = await authorizedRequest.get(`${config.apiBaseUrl}/upload?key=${key}`);
  return res;
};

export const getSignURL = async ({
  moduleName = "avatar",
  fileName,
}: {
  moduleName?: string;
  fileName: File;
}) => {
  const formData = new FormData();
  formData.append("file", fileName);
  formData.append("folder", moduleName);
  const res: { Key: string; Location: string } = await authorizedRequest.post(
    `${config.apiBaseUrl}/upload`,
    formData,
  );
  return res;
};

export const putImageToSignURL = async ({ file, signUrl }: { file: File; signUrl: string }) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("data", file);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signUrl);
    xhr.setRequestHeader("Content-Type", "");
    xhr.send(file);
    xhr.onload = function () {
      this.status < 400 ? resolve({}) : reject(this.responseText);
    };
  });
};

export const uploadImageFull = async ({
  file,
  moduleName,
}: {
  file: File;
  moduleName?: string;
}) => {
  const res = await getSignURL({ fileName: file, moduleName });

  const res2 = await getImageByKey({ key: res.Key });
  return {
    imageUrl: res2,
    key: res.Key,
  };
};
