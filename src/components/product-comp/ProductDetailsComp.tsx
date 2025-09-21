"use client";
import { ProductDetails } from "@/app/types/productDetails.model";
import React from "react";
import { StarRating } from "react-flexible-star-rating";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { addToCart } from "@/app/action/cart.action";
import toast from "react-hot-toast";


export default function ProductDetailsComp({
  productDetails,
}: {
  productDetails: ProductDetails;
}) {


   const {getCartDetails} = useCart();

  async function handleAddToCart(productId:string){
const response = await addToCart(productId);
console.log(response , "add to cart response");
toast.success(response?.message);
await getCartDetails();
  }
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
      <div className="w-full md:w-1/2"> 
      <Swiper
                slidesPerView={1}
                 spaceBetween={8}
                 navigation={true}
                 pagination={{
                   clickable: true,
                 }}
                 modules={[Navigation, Pagination]}
                 className="mySwiper "
               >
                 
                  {productDetails.images.map((src, index) => (<>
                     <SwiperSlide key = {index} className=''>
                      <div className='h-[800px] w-full relative '>
                             <Image 
                             src={src}
                              priority
                              loading='eager' 
                              alt="slider1" 
                              fill 
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                              className='object-contain'/>
                              
                              </div>
                            
                           </SwiperSlide>
                 </>) )
                }
               </Swiper>
               
               </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl text-start font-bold my-7 tracking-tighter">
          {productDetails.title}
        </h2>
        <p className="text-slate-500 text-start my-7 text-2xl tracking-tighter">
          {productDetails.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="catPrice">
            <p className="text-lg my-4">{productDetails.category.name}</p>
            <p className="text-lg my-4">{productDetails.price} EGP</p>
          </div>
          <div className="flex gap-3">
            <StarRating
              initialRating={Math.floor(productDetails.ratingsAverage)}
              dimension={8}
            />
            <span>{productDetails.ratingsAverage}</span>
          </div>
        </div>
        <button onClick={()=> handleAddToCart(productDetails._id)} className="bg-black cursor-pointer text-white w-full py-5 rounded-lg">+ add to cart</button>
      </div>
    </div>
  );
}
