"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";


import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPaswordPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface Inputs {
    email: string;
    newPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
   async function onSubmit(values: Inputs) {
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(response, "res after register");
      if (response.statusText === "OK") {
        
        router.push("/");
      }
      setErrorMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message, "axios error response data");
        setErrorMessage(error.response?.data.statusMsg);
      }
    }
  }
  return (
    <div className="w-1/2 mx-auto text-center my-10">
      <h2 className="md:text-3xl tracking-tighter font-bold my-5">please enter your Email and your new Password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        suppressHydrationWarning // Suppress hydration warnings for dynamic attributes
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
          placeholder="Your new Password"
          autoComplete="password"
          {...register("newPassword", {
            required: "newPassword is required",
          })}
        />
        {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
{errorMessage ? <p className="text-3xl font-bold text-red-600">{errorMessage}</p>: null}
       
        
          <Button
            type="submit"
            className="px-5 text-3xl py-10 my-5 w-50 bg-indigo-400 text-white font-bold rounded-lg"
          >
            Verify
          </Button>
        
      </form>
    </div>
  );
}
