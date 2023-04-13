const encodingSpecial = (str: string) =>
  str.replace("%", "%25").replace("#", "%23").replace("+", "%2B").replace("&", "%26");

/* eslint-disable @typescript-eslint/no-explicit-any */
const paramsSerializer = (params: any) => {
  let str: string = "";
  for (const key in params) {
    if (key) {
      if (
        typeof params[key] !== "object" &&
        params[key] !== "" &&
        params[key] !== false &&
        params[key] !== null &&
        params[key] !== undefined
      ) {
        if (str !== "") {
          str += "&";
        }
        if (typeof params[key] === "string") {
          str += `${key}=${encodingSpecial(params[key])}`;
        } else {
          str += `${key}=${params[key]}`;
        }
      }
      if (typeof params[key] === "object") {
        let strObj: string = "";
        for (const keyNest in params[key]) {
          if (
            typeof params[key][keyNest] !== "object" &&
            params[key][keyNest] !== undefined &&
            params[key][keyNest] !== ""
          ) {
            if (typeof params[key][keyNest] === "string") {
              strObj += `&${key}=${encodingSpecial(params[key][keyNest])}`;
            } else {
              strObj += `&${key}=${params[key][keyNest]}`;
            }
          }
        }
        str += strObj;
      }
    }
  }
  return str;
};

export default paramsSerializer;
