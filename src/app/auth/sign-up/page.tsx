"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Form, Formik } from "formik";
import { registerUserSchema } from "@/server/api/schema/user.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FC } from "react";

type InitialValues =  {
  email: string;
  password: string;
  username: string;
}

const SignUp:FC = () => {
  const route = useRouter();


  // const handleClick = (values: InitialValues) => {
  //   signIn("newUser", {
  //     email: values.email,
  //     password: values.password,
  //     username: values.username,
  //     redirect: false,
  //   }).then((status) => {
  //     route.push("/");
  //   });
  // };

  const handleClick = async (values: InitialValues) => {
    let response;
    try {
      response = await signIn("newUser", {
        email: values.email,
        password: values.password,
        username: values.username,
        redirect: false,
      });

      if (response?.ok) {
        route.push("/");
      } 
    } catch (error) {
      console.error(error);
    }
  };



  const handleGitHub = () => {
    signIn("github", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex h-full flex-col justify-center">
     <h1  
       className="mb-5 text-center text-primary text-2xl font-bold"
       >
        Sign Up
      </h1>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={toFormikValidationSchema(registerUserSchema)}
        onSubmit={handleClick}
      >
        {({ values, handleChange, errors, isSubmitting }) => (
          <Form>
            <div className="mb-10 flex flex-col gap-5">
                <input
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={values.username}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  className="border border-gray-300 p-2 rounded-md"
                />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} w-full mb-8`}              >

              Sign Up
            </button>
            <button
              type="button"
              onClick={handleGitHub}
              disabled={isSubmitting}
              className="mb-5 flex w-full items-center justify-center gap-x-5 rounded-md bg-black py-2.5 text-white"
            >
              Continue with GitHub
            </button>
            <Link href="/auth/sign-in" className="font-semibold text-blue-500 underline block text-center">
              Already have an account
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
