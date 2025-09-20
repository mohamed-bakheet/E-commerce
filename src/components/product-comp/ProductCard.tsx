"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Products } from "@/app/types/product.module";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/app/action/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";
import { addToWish } from "@/app/action/wish.action";
import { useWish } from "@/app/context/WishContext";

export default function ProductCard({ product }: { product: Products }) {
  const { getCartDetails } = useCart();
  const { fetchWishList, wishList } = useWish();

  async function handleAddToCart(productId: string) {
    const response = await addToCart(productId);
    console.log(response, "add to cart response");
    toast.success(response?.message);
    await getCartDetails();
  }
  async function handleAddWish(productId: string) {
    const isInWishlist = wishList?.data?.some(
      (item) => item._id === product._id
    );
    if (isInWishlist) {
      toast.error("Product is already in your wishlist");
      return;
    } else {
      const response = await addToWish(productId);
      console.log(response, "add to cart response");
      toast.success(response?.message);
      await fetchWishList();
    }
  }
  const isInWishlist = wishList?.data?.some((item) => item._id === product._id);

  return (
    <div>
      <Card className="relative overflow-hidden group">
        <Link
          className="absolute top-0 bottom-0 right-0 left-0 z-1 w-100 h-100"
          href={`/products/${product._id}`}
        ></Link>
        <div className="absolute flex flex-col z-3 gap-5 top-[150px] right-[-100px] px-2 py-1 rounded-md group-hover:right-0 transition-all duration-500 ease-in-out ">
          <button
            onClick={() => handleAddToCart(product._id)}
            className=" p-2 cursor-pointer bg-slate-200 text-black hover:text-blue-700"
          >
            <ShoppingCart />
          </button>
          <button
            onClick={() => handleAddWish(product._id)}
            className=" p-2 cursor-pointer bg-slate-200 text-black hover:text-blue-700"
          >
            <Heart
              className={`${isInWishlist ? "text-red-500 fill-red-500" : ""}`}
            />
          </button>

          <button className=" p-2 cursor-pointer bg-slate-200 text-black hover:text-blue-700">
            <Link href={`/products/${product._id}`}>
              <ZoomIn />
            </Link>
          </button>
        </div>
        <CardHeader>
          <CardTitle>
            {product.title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>
          <CardDescription>
            {product.description.split(" ").slice(0, 4).join(" ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="relative w-full h-[300px]">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 z-0">
          <StarRating
            initialRating={Math.floor(product.ratingsAverage)}
            dimension={8}
          />
          <h2 className="text-lg font-bold my-3">
            Price: <span>{product.price}</span> EGP
          </h2>
        </CardFooter>
      </Card>
    </div>
  );
}
