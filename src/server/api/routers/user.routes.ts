import { publicProcedure, createTRPCRouter } from "../trpc";
import { loginUserSchema, registerUserSchema } from "../schema/user.schema";
import {
  getMeHandler,
  loginHandler,
  registerHandler
} from "../controller/user.controller";

export const userRoute = createTRPCRouter({
  getMe: publicProcedure.input(String).query(({ input, ctx }) => getMeHandler({ input,ctx })),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  registerUser: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input, ctx }) => registerHandler({ input, ctx })),
});
