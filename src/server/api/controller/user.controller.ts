import {
  type LoginUserInput,
  type RegisterUserInput,
} from "../schema/user.schema";
import { createUser, findUniqueUser } from "../service/user.service";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const loginHandler = async ({
  input,
  ctx: { req, res },
}: {
  input: LoginUserInput;
  ctx: any;
}) => {
  try {
    const user = await findUniqueUser({ email: input.email });

    if (!user || !(await bcrypt.compare(input.password, user.password as string))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    return {
      status: "success",
      user: user,
      access_token: user.email,
    };
  } catch (err: any) {
    throw err;
  }
};

export const registerHandler = async ({
  input,
  ctx: { req, res },
}: {
  input: RegisterUserInput;
  ctx: any;
}) => {
  const pass = await bcrypt.hash(input.password, 12);

  const user = await createUser({
    email: input.email,
    name: input.username,
    password: pass,
  });

  return {
    status: "success",
    user: user,
  };
};

export const getMeHandler = async ({ input, ctx }: { input: any; ctx: any }) => {
  const user = await findUniqueUser({ email: input || "" });

  return {
    status: "success",
    user: user,
  };
};
