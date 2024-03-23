import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type LoginFormTypes = z.infer<typeof loginSchema>;

export type LoginResponseTypes = {
  statusCode: number;
  data: {
    token: string;
  };
  message: string;
  success: boolean;
};

export type LoginType = (data:LoginFormTypes) => Promise<LoginResponseTypes>