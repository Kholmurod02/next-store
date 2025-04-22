"use client"

import React from 'react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../../app/globals.css';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import iphone from "@/images/toyota_camry.avif"
import image1 from '@/images/photo_2025-04-21_15-14-57.jpg'
import image2 from '@/images/photo_2025-04-21_15-15-09.jpg'
import image3 from '@/images/photo_2025-04-21_15-15-15.jpg'




export const Swiperr = () => {

  return (
    <>
      <Swiper
        cssMode={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >


        <SwiperSlide className="h-64 overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Image
              src={image3}
              alt="Feature showcase"
              className="object-cover object-center w-full h-full"
              fill
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="h-64 overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Image
              src={iphone}
              alt="iPhone showcase"
              className="object-cover w-full h-full"
              fill
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="h-64 overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Image
              src={image1}
              alt="Product showcase"
              className="object-cover w-full h-full"
              fill
            />
          </div>
        </SwiperSlide>




      </Swiper>
    </>
  )
}

export default Swiperr