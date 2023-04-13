import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";

export const getImageByKey = async (params: { key: string }) => {
  const res = await authorizedRequest.get(`${config.apiBaseUrl}/upload/signed-url`, { params });
  return res;
};

export const getSignURL = async (params: { moduleName?: string; fileName: string }) => {
  const res: { key: string; preSignedUrl: string } = await authorizedRequest.get(
    `${config.apiBaseUrl}/upload/upload-signed-url`,
    { params },
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
  const res = await getSignURL({ fileName: file.name, moduleName });
  await putImageToSignURL({ file, signUrl: res.preSignedUrl });
  const res2 = await getImageByKey({ key: res.key });
  return {
    imageUrl: res2,
    key: res.key,
  };
};
