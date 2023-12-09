"use client"
import React, { FC } from "react";
import { signOut, useSession } from "next-auth/react";

export const Header: FC = () => {
  const user = useSession();
  return (
    <div className="fixed flex justify-between items-center w-full bg-blue-500 p-15">
    <div className="text-2xl font-bold text-white">
      {user.data?.user?.name}
    </div>
    <button
      className="text-white hover:text-gray-300 focus:outline-none"
      onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
    >
      Sign out
    </button>
  </div>
  )
};
