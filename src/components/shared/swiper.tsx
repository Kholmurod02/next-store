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
import car from "@/images/toyota_camry.avif"
import iphone from '@/images/iphone14.png'
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
        <div className='flex justify-around mx-5  bg-black text-white h-full'>
            <div className='flex flex-col items-start gap-5] justify-center'>
                <div className='flex gap-6 items-center'>
                {/* <Image src={iphone} alt='iphone' /> */}

                <p>iPhone 14 Series</p>
                </div>
                <p className='text-6xl'>Up to 10% <br /> off Voucher</p>
                <button className='cursor-pointer'>Shop Now {">"}</button>
            </div>
            <div className="">
            <Image className='relative z-0'  src={iphone} alt='iphone-14'/>
            </div>
            </div>
        </SwiperSlide>
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
              src={car}
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

        <SwiperSlide>
          <Image src={image2} alt=''/>
        </SwiperSlide>



      </Swiper>
    </>
  )
}

export default Swiperr