import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

export const getImageByKey = async ({ key }: { key: string }) => {
  const res = await axios.get(`${apiRoute.upload.getSignURL}?key=${key}`);
  return res.data;
};

export const getSignURL = async ({
  moduleName = "user",
  fileName,
}: {
  moduleName?: string;
  fileName: string;
}) => {
  const res: { data: { key: string; preSignedUrl: string } } = await axios.get(
    `${apiRoute.upload.getUploadSignURL}?moduleName=${moduleName}&fileName=${fileName}`,
  );
  return res.data;
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
  return { url: res2, key: res.key };
};
