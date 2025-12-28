import axios, { AxiosError } from "axios";
import { env } from "../env";

export const api = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: AxiosError<any>) => {
    // Network / timeout / CORS / service down
    if (!error.response) {
      return Promise.reject({
        message: "Service unavailable. Please try again later.",
        status: 0,
        type: "NETWORK_ERROR",
      });
    }

    const { status, data } = error.response;

    return Promise.reject({
      message: data?.message || "Something went wrong",
      status,
      type: "API_ERROR",
      errors: data?.errors,
    });
  }
);