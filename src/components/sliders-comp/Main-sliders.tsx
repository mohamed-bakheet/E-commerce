"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function MainSliders() {
  return (
    <div className="container text-center relative mx-auto my-10 h-max overflow-hidden">
      <div className="top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute z-3">
        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-extrabold uppercase">
          fashion changing always
        </h1>
        <button className="mt-5 bg-blue-500 py-3 px-8 md:py-5 md:px-15 font-bold text-xl md:text-2xl lg:text-3xl text-white">
          Shop now
        </button>
      </div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper h-[500px] md:h-[700px] lg:h-[900px] w-full relative"
      >
        <SwiperSlide className="">
          <Image
            src="/Slider/h1_hero1.png"
            priority
            loading="eager"
            alt="slider1"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="rounded-lg object-cover md:object-center lg:object-top"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <Image
            src="/Slider/h1_hero2.png"
            alt="slider2"
            priority
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="rounded-lg object-cover md:object-center lg:object-top"
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <Image
            src="/Slider/h1_hero3.png"
            alt="slider3"
            priority
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="rounded-lg object-cover md:object-center lg:object-top"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}