"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  interface Inputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(response, "res after register");
      if (response.data.message === "success") {
        router.push("/login");
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
      <h2 className="text-3xl tracking-tighter font-bold my-5">Register</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="text"
          placeholder="Your Name"
          {...register("name", { required: "name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="email"
          placeholder="Your Email"
          {...register("email", {
            required: "email is required",
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="password"
          placeholder="Your Password"
          {...register("password", {
            required: "password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="password"
          placeholder="Confirm Password"
          {...register("rePassword", {
            required: "password is required",
          })}
        />
        {errors.rePassword && (
          <p className="text-red-500">{errors.rePassword.message}</p>
        )}
        <Input
          className="p-5 my-7 border-3 border-gray-500 focus:border-black focus:border-4 rounded-2xl"
          type="tel"
          placeholder="Your Phone"
          {...register("phone", {
            required: "phone is required",
          })}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        <Button type="submit" className="px-7 my-5 w-50 mx-auto">
          Register
        </Button>
      </form>
    </div>
  );
}
