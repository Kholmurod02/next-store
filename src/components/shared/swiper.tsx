"use client"

import React from 'react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../../app/globals.css';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import car from "@/images/2025-toyota-camry-xse-awd-123-66993cc94cc40.avif"
import image1 from '@/images/photo_2025-04-21_15-14-57.jpg'
import image3 from '@/images/photo_2025-04-21_15-15-15.jpg'




export const Swiperr = () => {

  return (
    <>
      <Swiper
        cssMode={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Added for better UX
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        mousewheel={{
          forceToAxis: true, // Only vertical scrolling affects slides
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper group"
        breakpoints={{
          640: {
            height: 384, // Larger height on medium screens
          },
          1024: {
            height: 448, // Even larger on desktop
          },
        }}
      >
   
        <SwiperSlide className="h-64 md:h-full overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Image
              src={image3}
              alt="Feature showcase"
              className="object-cover object-center"
              fill
              priority
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Summer Collection</h2>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Car Image */}
        <SwiperSlide className="h-64 md:h-full overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Image
              src={car}
              alt="Car showcase"
              className="object-cover object-center"
              fill
              sizes="100vw"
              quality={85}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">New Arrivals</h3>
              <p className="text-white/90">Discover our latest products</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 - Product Showcase */}
        <SwiperSlide className="h-64 md:h-full overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Image
              src={image1}
              alt="Product showcase"
              className="object-cover object-right"
              fill
              sizes="100vw"
              quality={85}
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Limited Time Offer</h3>
              <p className="text-white mt-2">Special discounts this week only</p>
            </div>
          </div>
        </SwiperSlide>
        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="swiper-button-next hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Swiper>
    </>
  )
}

export default Swiperr