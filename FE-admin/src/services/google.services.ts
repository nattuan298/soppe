import { config } from "src/constants/config";
import { execute } from "src/lib/execute";

export function turnOnSecurityGoogle(twoFactorAuthenticationCode: string): Promise<void> {
  return execute.put(`${config.apiBaseUrl}/admin/users/security/2fa/turn-on`, {
    twoFactorAuthenticationCode,
  });
}
export function turnOffSecurityGoogle(twoFactorAuthenticationCode: string): Promise<void> {
  return execute.put(`${config.apiBaseUrl}/admin/users/security/2fa/turn-off`, {
    twoFactorAuthenticationCode,
  });
}
