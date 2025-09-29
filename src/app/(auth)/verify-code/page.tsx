"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";


import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function VerifyCodePage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface Inputs {
    resetCode: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
   async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(response, "res after register");
      if (response.data.status === "Success") {
        router.push("/reset-password");
      }
      setErrorMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message, "axios error response data");
        setErrorMessage(error.response?.data.message);
      }
    }
  }
  return (
    <div className="w-1/2 mx-auto text-center my-10">
      <h2 className="text-3xl tracking-tighter font-bold my-5">please enter your Email</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        suppressHydrationWarning // Suppress hydration warnings for dynamic attributes
      >
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="text"
          placeholder="Your verification code"
          autoComplete="number"
          {...register("resetCode", {
            required: "resetCode is required",
          })}
        />
        {errors.resetCode && <p className="text-red-500">{errors.resetCode.message}</p>}

       
        
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
