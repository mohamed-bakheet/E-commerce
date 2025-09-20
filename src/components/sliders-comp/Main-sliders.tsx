"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function MainSliders() {
  return (
    <div className='container text-center relative mx-auto my-10 max-w-9/10 h-max'>
        <div className=' top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  absolute z-3'>
        <h1 className='text-white text-8xl font-extrabold uppercase' >fashion changing always</h1>
        <button className='mt-5 bg-blue-500 py-5 px-15 font-bold text-3xl text-white'>Shop now</button>
        </div>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper h-[900px] w-full relative"
      >
        
        <SwiperSlide className=''>
          <Image src="/Slider/h1_hero1.png" priority loading='eager' alt="slider1" fill className='rounded-lg object-cover'/>
          
        </SwiperSlide>
         <SwiperSlide className=''>
          <Image src="/Slider/h1_hero2.png" alt="slider1" priority loading='eager' fill  className='rounded-lg object-cover'/>
        </SwiperSlide>
         <SwiperSlide className=''>
          <Image src="/Slider/h1_hero3.png" alt="slider1" priority loading='eager' fill className='rounded-lg object-cover'/>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
