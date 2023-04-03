export interface ForgotPayloadType {
  username: string,
  email: string,
}
export type FetchForgotAction = {
  type: string;
  payload: ForgotPayloadType;
};

export const FORGOT_ACTION = "FORGOT_ACTION";
