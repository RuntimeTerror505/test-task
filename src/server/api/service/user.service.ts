import {Prisma, User} from "@prisma/client";
import { db } from "../../db";

export const createUser = async (input: Prisma.UserCreateInput) => {
  return await db.user.create({
    data: input,
  }) as User;
};

export const findUser = async (
  where: Partial<Prisma.UserWhereInput>,
  select?: Prisma.UserSelect,
) => {
  return await db.user.findFirst({
    where,
    select,
  }) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect,
) => {
  return await db.user.findUnique({
    where,
    select,
  }) as User;
};

export const addFavorite = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) => {
  return await db.user.update({
    where,
    data,
  }) as User;
};
