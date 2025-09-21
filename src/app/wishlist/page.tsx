"use client";
import React, { useEffect } from "react";
import { useWish } from "@/app/context/WishContext";
import WishlistComp from "@/components/Wishlist-comp/WishlistComp";

export default function WishlistPage() {
  const { fetchWishList } = useWish();

  useEffect(() => {
    fetchWishList(); // Ensure data is fetched when the page loads
  }, []);

  return (
    <div className="container text-center mx-auto my-10 max-w-9/10 h-max">
      <h2 className="text-4xl">Wishlist</h2>
      <WishlistComp />
    </div>
  );
}
