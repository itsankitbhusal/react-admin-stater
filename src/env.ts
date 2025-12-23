import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.string().min(1),
    VITE_ENV: z.enum(["dev", "staging", "prod"]),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
