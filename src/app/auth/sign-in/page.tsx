"use client";
import React, { FC } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  loginUserSchema,
  LoginUserInput,
} from "@/server/api/schema/user.schema";
import { Form, Formik } from "formik";

const SignIn:FC = () => {
  const route = useRouter();
  const handleClick = (values: LoginUserInput) => {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then(() => {
        route.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleGitHub = () => {
    signIn("github", {
        callbackUrl: "/"
    })
  };

  return (
    <div className="flex h-full flex-col justify-center">
      <h1
        className="mb-5 text-center text-primary text-2xl font-bold"      >
        Sign In
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={toFormikValidationSchema(loginUserSchema)}
        onSubmit={handleClick}
      >
        {({ values, handleChange, errors, isSubmitting }) => (
          <Form>
            <div className="mb-10 flex flex-col gap-5">
                <input
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="password"
                  className="border border-gray-300 p-2 rounded-md"

                />
            </div>
            <div>
              <button
                disabled={isSubmitting}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} w-full mb-8`}              >
                Sign In
              </button>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleGitHub}
              className="mb-5 flex w-full items-center justify-center gap-x-5 rounded-md bg-black py-2.5 text-white"
            >
              Continue with GitHub
            </button>
            <Link href="/auth/sign-up" className="font-semibold text-blue-500 underline block text-center">
  create account
</Link>

          </Form>
        )}
      </Formik>
    </div>
  );
}


export default SignIn;