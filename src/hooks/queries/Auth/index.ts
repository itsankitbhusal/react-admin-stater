import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../api/auth/auth.api";
import logger from "../../../logger";
import { message } from "antd";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
        // logger.log("login success response: ", res);
    },

    onError: (error) => {
      message.error(error?.message ?? "Login failed");
      logger.error(error?.message ?? "Login failed!");
    },
  });
};
