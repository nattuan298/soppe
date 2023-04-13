export interface Authentication {
  username?: string;
  password?: string;
}

export type CustomerLoginResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  scope: string;
  session_state: string;
};

export interface AuthenticationAdmin {
  jwtAccessToken?: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  googleAuth?: boolean;
  topic?: string;
  statusCode?: number;
}
