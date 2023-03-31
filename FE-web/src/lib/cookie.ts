import { Cookies } from "react-cookie";

const saveCookieAsyn = (name: string, payload: string | number | object) =>
  new Promise((resolve, reject) => {
    const cookies = new Cookies();
    cookies.set(name, payload);
    setTimeout(() => {
      if (!cookies.get(name)) {
        reject("Unsuccess");
      }
      resolve({});
    }, 1000);
  });

export const setCookie = async (name: string, payload: string | number | object) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cookieStore = (window as any)?.cookieStore;
    if (cookieStore && encodeURIComponent) {
      await cookieStore.set(name, encodeURIComponent(JSON.stringify(payload)));
    } else {
      // For FireFox and Safari don't support cookieStore
      await saveCookieAsyn(name, payload);
    }
  } catch (error) {
    console.error(`Failed to set cookie: ${error}`);
  }
};
