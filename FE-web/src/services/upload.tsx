import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

export const getImageByKey = async ({ key }: { key: string }) => {
  const res = await axios.get(`${apiRoute.upload.getSignURL}?key=${key}`);
  return res.data;
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
  const res: { data: { Key: string; Location: string } } = await axios.post(
    `${apiRoute.upload.getUploadSignURL}`,
    formData,
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
  const res = await getSignURL({ fileName: file, moduleName });
  // await putImageToSignURL({ file, signUrl: res.Location });
  console.log(res);
  const res2 = await getImageByKey({ key: res.Key });
  return { url: res2, key: res.Key };
};
