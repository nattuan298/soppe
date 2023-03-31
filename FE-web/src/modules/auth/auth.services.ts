import { browserConfig } from "src/constants/browser-config";
import apiClientBrowser from "src/lib/client/request";

// For services that does not need to be shared in multiple modules
// place it in the module

const apiAuthUrl = `${browserConfig.apiBaseUrl}/api/auth`;

export async function signup(userId: string, password: string) {
  try {
    const res = await apiClientBrowser.post(`${apiAuthUrl}/signup`, {
      userId,

      password,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
