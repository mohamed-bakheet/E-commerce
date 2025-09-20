"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";

import { getCashPayment, getOnlinePayment } from "../action/payment.action";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export default function checkoutPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const {cartDetails , setCartDetails} = useCart();
  const cartId = cartDetails?.cartId;
  const [paymentMethod , setPaymentMethod] = useState<"cash" | "online" | null>(null);

  interface Inputs {
    details: string;
    city: string;
    phone: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  async function onSubmit(values: Inputs) {
    if (paymentMethod == "cash") {
try {
   const response = await getCashPayment(cartId as string, values);
        console.log(response, "payment response");
        if(response?.data.status === "success"){
          setCartDetails(null);
         router.push("/");
        }
    } catch (error) {
      console.log(error);
     }
    }else if(paymentMethod == "online"){
        try {
   const response = await getOnlinePayment(cartId as string, values);
        console.log(response?.data, "online response");
        if(response?.data.status === "success"){
window.location.href = response?.data.session.url;
        //  setCartDetails(null);
        // router.push("/");
        }
    } catch (error) {
      console.log(error);
     }
    }

    console.log(paymentMethod, "checkout");
  
   
  }

  return (
    <div className="w-1/2 mx-auto text-center my-10">
      <h2 className="text-3xl tracking-tighter font-bold my-5">Register</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          className="p-5 my-7"
          type="text"
          placeholder="Your Details"
          {...register("details", { required: "details is required" })}
        />
        {errors.details && <p className="text-red-500">{errors.details.message}</p>}

        <Input
          className="p-5 my-7"
          type="text"
          placeholder="Your City"
          {...register("city", { required: "city is required" })}
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
       
        <Input
          className="p-5 my-7"
          type="tel"
          placeholder="Your Phone"
          {...register("phone", {
            required: "phone is required",
          })}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        <RadioGroup onValueChange={(val)=> setPaymentMethod(val as "online"|"cash")} >
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="cash" id="cash" />
    <Label htmlFor="option-one">cash Payment</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="online" id="online" />
    <Label htmlFor="option-two">online Payment</Label>
  </div>
</RadioGroup>
        <Button type="submit" className="px-7 py-7 my-5 w-50 mx-auto">
          Checkout
        </Button>
      </form>
    </div>
  );
}

