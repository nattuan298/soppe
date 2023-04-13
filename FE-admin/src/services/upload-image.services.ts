import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";

export const getImageByKey = async ({ key }: { key: string }) => {
  const params = { key };
  const res = (await authorizedRequest.get(`${config.apiBaseUrl}/upload/signed-url`, {
    params,
  })) as string;
  return res;
};

export const getSignURL = async ({
  moduleName = "user",
  fileName,
}: {
  moduleName?: string;
  fileName: string;
}) => {
  const params = { moduleName, fileName };
  const res: { key: string; preSignedUrl: string } = await authorizedRequest.get(
    `${config.apiBaseUrl}/upload/upload-signed-url`,
    {
      params,
    },
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
      this.status < 400 ? resolve({ status: this.status }) : reject(this.responseText);
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
  const match = /.*\.(.+)/.exec(file.name);
  const suffix = match && match[1];
  const name = file.name
    .split(".")
    .slice(0, -1)
    .join(".")
    .replaceAll("#", Math.floor(Math.random() * 100) + "")
    .replaceAll("+", Math.floor(Math.random() * 100) + "")
    .replaceAll("'", Math.floor(Math.random() * 100) + "");
  const fileName = `${name}${new Date().getTime() + Math.ceil(Math.random() * 100)}.${suffix}`;
  const res = await getSignURL({ fileName, moduleName });
  await putImageToSignURL({ file, signUrl: res.preSignedUrl });
  return res.key;
};
