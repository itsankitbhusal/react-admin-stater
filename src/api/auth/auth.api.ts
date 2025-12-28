import { apiUrls } from "../../constants/apiUrls";
import { api } from "../axios";
import type { ILoginRequest } from "./auth.types";

export const login = async (payload: ILoginRequest) => {
  const data = await api.post(apiUrls.Auth.login, payload);
  return data?.data;
};
