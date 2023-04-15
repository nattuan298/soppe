import { authorizedRequest } from "src/lib/request";
import { config } from "src/constants/config";
import { execute } from "src/lib/execute";
import publicIp from "public-ip";

let OSName = "Unknown OS";
if (navigator.userAgent.indexOf("Win") !== -1) OSName = "Windows";
if (navigator.userAgent.indexOf("Mac") !== -1) OSName = "MacOS";
if (navigator.userAgent.indexOf("X11") !== -1) OSName = "UNIX";
if (navigator.userAgent.indexOf("Linux") !== -1) OSName = "Linux";
export function getUserAuthentication(username: string, password: string): Promise<void> {
  return authorizedRequest.post(`${config.apiBaseUrl}/auth/admin/login`, { username, password });
}
export async function signinGoogleAuth(twoFactorAuthenticationCode: string): Promise<void> {
  const ip = await publicIp.v4();
  return execute.post(`${config.apiBaseUrl}/auth/admin/2fa`, {
    twoFactorAuthenticationCode,
    OS: OSName,
    IP: ip,
  });
}
export async function signOut(): Promise<void | any> {
  const ip = await publicIp.v4();
  return authorizedRequest.post(`${config.apiBaseUrl}/auth/admin/sign-out`, {
    OS: OSName,
    IP: ip,
  }) as any;
}
