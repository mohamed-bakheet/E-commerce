"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";


import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function forgetPaswordPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface Inputs {
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
   async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(response, "res after register");
      if (response.data.statusMsg === "success") {
        
        router.push("/verify-code");
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
          className="p-5 my-7"
          type="email"
          placeholder="Your Email"
          autoComplete="email"
          {...register("email", {
            required: "email is required",
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

       {errorMessage? <p className="text-red-600 bg-red-200  border-4 p-10 m-10">{errorMessage}</p> : null}
        
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
