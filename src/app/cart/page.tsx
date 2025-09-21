"use client";
import React, { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import CompCart from "@/components/Cart-comp/CompCart";

export default function CartPage() {
  const { getCartDetails } = useCart();

  useEffect(() => {
    getCartDetails(); // Ensure data is fetched when the page loads
  }, []);

  return (
    <div>
      <CompCart />
    </div>
  );
}
