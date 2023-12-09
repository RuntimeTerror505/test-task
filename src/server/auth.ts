import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import {api} from "@/trpc/server";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
    signOut: "/auth/sign-in",
  },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await api.user.loginUser.mutate({
            email: credentials!.email,
            password: credentials!.password,
          });
          if (user.status === 'success'){
            return { id: user.user.id, name: user.user.name, email: user.user.email };
          }
          return null
        }
        catch (e) {
          throw new Error( JSON.stringify({ errors: "Invalid email or password", status: false }))
        }
      },
    }),
    CredentialsProvider({
      id: "newUser",
      name: "newUser",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const user = await api.user.registerUser.mutate({
            email: credentials!.email,
            password: credentials!.password,
            username: credentials!.username,
          });
          if (user.status === 'success'){
            return { id: user.user.id, name: user.user.name, email: user.user.email };
          }
          return null
        }
        catch (e) {
          throw new Error( JSON.stringify({ errors: "Invalid email or password", status: false }))
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return await session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
