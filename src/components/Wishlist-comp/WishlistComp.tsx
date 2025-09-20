"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useWish } from "@/app/context/WishContext";
import { useCart } from "@/app/context/CartContext";
import { addToCart } from "@/app/action/cart.action";
import toast from "react-hot-toast";
import { deleteFromWish } from "@/app/action/wish.action";

export default function WishlistComp() {
    const {wishList}= useWish();
     const {getCartDetails} = useCart();
     const{fetchWishList} = useWish();
 

  async function handleAddToCart(productId:string){
const response = await addToCart(productId);
console.log(response , "add to cart response");
toast.success(response?.message);
await getCartDetails();
  };

  async function handleRemoveFromWish(productId: string) {
    const response = await deleteFromWish(productId);
    console.log(response, "remove from cart response");
    toast.success("Product removed from cart");
    await fetchWishList();
  };
  return (

    <div className="flex flex-col container text-center py-10 px-4  mx-auto my-10 max-w-9/10 h-max">
        {wishList?.data.map((item)=> <div key={item._id} className="grid lg:grid-cols-10 grid-cols-1 border p-5 rounded-lg gap-5">
        <div className="lg:col-span-2 flex justify-center w-full  p-5 h-max">
          <Image
            src={item.imageCover}
            alt="product image"
            width={300}
            height={200}
            className="me-5 object-contain"
          />
        
        </div>
        <div className="lg:col-span-8 flex flex-col lg:flex-row justify-between  p-5  h-max">
            <div className="flex flex-col text-start gap-5">
<h2 className="text-3xl font-bold mb-4">{item.title}</h2>
<h2 className="text-2xl font-bold mb-4 text-green-700">{item.price} EGP</h2>
<div onClick={()=>(handleRemoveFromWish(item._id))} className="flex items-center gap-3 cursor-pointer text-red-600 mb-8">
    <Trash2/>
<h2> Remove</h2>
</div>
</div>
            <div className="flex items-center">
                <Button onClick={()=> handleAddToCart(item._id)} className="bg-indigo-400 p-10 rounded-lg text-white text-3xl font-bold">Add to Cart</Button>
                </div>
        </div>
      </div>)}
      
    </div>
  );
}
