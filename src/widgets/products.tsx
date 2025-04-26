"use client"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../app/globals.css';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import ProductCard from '@/components/shared/productCard'
import { useGetProductsQuery } from '@/store/api/productApiSlice'
import { IProduct } from '@/types'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery('')

  const productData = data?.data?.products || []


  return (
    <>
      {
        productData.map((el: IProduct) => {
          return (
            <ProductCard el={el} key={el.id} />
          )
        })
      }
    </>
  )
}

export default Products




export const ProductsInSwiper = () => {

  const { data, isLoading, error } = useGetProductsQuery('')

  const productData = data?.data?.products || []

  return (
    <Swiper
    cssMode={true}
    loop={true}
    slidesPerView={4}
    spaceBetween={20}
    freeMode={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      waitForTransition: true, // Added to prevent half-cut transitions
    }}
    speed={400} // Smoother transitions
    grabCursor={true} // Visual feedback when grabbing
    navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }}
    pagination={{
      clickable: true,
      dynamicBullets: true,
      renderBullet: (index, className) => { // Custom bullet styling
        return `<span class="${className} !bg-primary !w-2.5 !h-2.5 !opacity-50 !mx-1"></span>`;
      },
    }}
    mousewheel={{
      forceToAxis: true,
      sensitivity: 0.5, // Reduced sensitivity for better control
    }}
    keyboard={{
      enabled: true,
      onlyInViewport: true,
    }}
    modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
    className="mySwiper group mt-20"
    breakpoints={{
      0: { // Mobile first approach
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 15,
        height: 384,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        height: 448,
      },
    }}
    onSlideChange={() => console.log('slide change')} // Optional callback
    onSwiper={(swiper) => console.log(swiper)} // Optional callback
  >
    {productData.map((el: IProduct) => (
      <SwiperSlide key={el.id} className="!h-auto"> {/* Better height handling */}
        <ProductCard el={el} />
      </SwiperSlide>
    ))}
  
   
     <div className="swiper-button-prev hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
     <div className="swiper-button-next hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </Swiper>
  )
}