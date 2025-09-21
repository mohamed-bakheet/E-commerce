"use client"
import { Categories } from '@/app/types/category.model'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function CatSliderComp({ categories }: { categories: Categories[] }) {
console.log(categories , "cat slider comp data");
  return (
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
          
         <Swiper
          slidesPerView={4}
           spaceBetween={90}
           navigation={true}
           pagination={{
             clickable: true,
           }}
           breakpoints={{
          // Define breakpoints for different screen sizes
          320: {
            slidesPerView: 1, // 1 slide for small screens (e.g., mobile)
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2, // 2 slides for medium screens (e.g., tablets)
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3, // 3 slides for larger screens
            spaceBetween: 60,
          },
          1280: {
            slidesPerView: 4, // 4 slides for extra-large screens
            spaceBetween: 90,
          },
        }}
           modules={[Navigation, Pagination]}
           className="mySwiper h-[400px] flex items-center"
         >
           
            {categories?.map((cat) => (<>
               <SwiperSlide key = {cat._id} className=''>
                <div className='h-[350px] w-full relative group '>
                       <Image 
                       src={cat.image}
                        priority
                        loading='eager' 
                        alt="slider1" 
                        fill 
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                        className='object-center'/>
                        <div className=' flex justify-center items-center h-[100px] text-center text-2xl absolute opacity-0 transition-all duration-500 ease-in-out bottom-0 bg-gray-400/75 w-full group-hover:opacity-100'>
                        <p className='font-bold'>{cat.name}</p>
                        </div>
                        </div>
                        
                     </SwiperSlide>
           </>) )
          }
         </Swiper>
       </div>
  )
}
