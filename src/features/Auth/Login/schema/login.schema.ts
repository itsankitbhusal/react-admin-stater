import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Please input your username!"),
  password: z.string().min(1, "Please input your password!"),
  remember: z.boolean().optional(),
});


export type LoginFormValues = z.infer<typeof loginSchema>