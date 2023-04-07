export interface ForgotPayloadType {
  username: string,
  email: string,
}
export interface RecoverPayloadType {
  code: string,
  newPassword: string,
}
export type FetchForgotAction = {
  type: string;
  payload: ForgotPayloadType;
};
export type FetchRecoverAction = {
  type: string;
  payload: RecoverPayloadType;
};


export const FORGOT_ACTION = "FORGOT_ACTION";
export const RECOVER_ACTION = "RECOVER_ACTION";
