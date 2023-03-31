export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const SIGN_OUT_API = "SIGN_OUT_API";

export interface ModelNotify {
  notifyStatus: boolean;
  _id: string;
}
export type payloadProps = {
  OSName: string;
};
export type signOutSettingProps = {
  type: typeof SIGN_OUT_API;
  payload: payloadProps;
};
