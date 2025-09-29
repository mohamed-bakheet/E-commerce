"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  

   

  interface Inputs {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {
    
    try {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log("SignIn result:", result);

    if (result?.error) {
      console.log("API Error:", result.error); // 👈 now should show "User not found" etc.
      setErrorMessage(result.error);
    } else if (result?.ok) {
      console.log("Login success ✅ redirecting...");
      window.location.href = "/";
    }
  } catch (err) {
    console.error("Unexpected signIn error:", err);
    setErrorMessage("Something went wrong. Please try again.");
  }
}

  

  return (
    <div className="w-1/2 mx-auto text-center my-10">
      <h2 className="text-3xl tracking-tighter font-bold my-5">Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        suppressHydrationWarning
      >
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="email"
          placeholder="Your Email"
          autoComplete="email"
          {...register("email", {
            required: "email is required",
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="password"
          placeholder="Your Password"
          autoComplete="current-password"
          {...register("password", {
            required: "password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex flex-col md:flex-row justify-between items-center w-full m-4">
          <Link
            href={"/forgetpasword"}
            className="text-blue-500 hover:underline text-2xl md:text-4xl"
          >
            Forget Password?
          </Link>
          <Button
            type="submit"
            className="px-5 md:text-3xl text-2xl py-10 my-5 w-50 bg-indigo-400 text-white font-bold rounded-lg"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
