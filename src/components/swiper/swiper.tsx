"use client"

import React from 'react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../../app/globals.css';
import { Navigation, Pagination, Mousewheel, Keyboard ,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';




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
    modules={[Navigation, Pagination, Mousewheel, Keyboard ,Autoplay]}
    className="mySwiper"
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
    
  </Swiper>
  </>
  )
}

export default Swiperr