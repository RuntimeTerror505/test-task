import { TypeOf, z } from "zod";

export const loginUserSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email or password"),
  password: z.string({ required_error: "Password is required" }),
});

export const registerUserSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email or password"),
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});


export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type RegisterUserInput = TypeOf<typeof registerUserSchema>;

