import type { IApiResponse } from "../../types/api";

export interface ILoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expires_in: number;
}

export type ILoginResponse = IApiResponse<IAuthTokens>;
