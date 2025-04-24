"use client"
import { CategoryCard } from '@/components/shared/categoryCard'
import { useGetCategoriesQuery } from '@/store/api/categoryApiSlice'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '../app/globals.css'

import { FreeMode, Pagination , Autoplay} from 'swiper/modules';
const Categories = () => {
  const { data, isLoading, error } = useGetCategoriesQuery([])
  const categoryData = data

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки данных</div>

  return (
    <Swiper
    slidesPerView={3}
    spaceBetween={40}
    loop={true}
    freeMode={{
      enabled: true,
      momentum: true, // Smooth free mode motion
      momentumRatio: 1, // Adjust scroll sensitivity
      sticky: true, // Snap to positions
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      waitForTransition: true, // Added to prevent half-cut transitions
    }}
    pagination={{
      clickable: true,
      dynamicBullets: true, // Dynamic pagination bullets
      renderBullet: (index, className) => (
        `<span class="${className} !bg-primary !w-3 !h-3 !opacity-80 hover:!opacity-100 !mx-1"></span>`
      ),
    }}
    modules={[FreeMode, Pagination,Autoplay]}
    className="mySwiper"
    breakpoints={{
      0: { // Mobile
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: { // Small tablets
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: { // Tablets
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: { // Desktop
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
    }}
    grabCursor={true} // Shows grab cursor on hover
    resistance={true} // Better edge resistance
    resistanceRatio={0.85} // Adjust edge bounce
    onReachEnd={() => console.log('Reached end')} // Optional callback
  >
    {categoryData?.data?.map((category) => (
      <SwiperSlide 
        key={category.id}
        className="!h-auto transition-transform duration-300 hover:scale-[1.02]" // Hover effect
      >
        <CategoryCard el={category} />
      </SwiperSlide>
    ))}
     <div className="swiper-button-prev hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
     <div className="swiper-button-next hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </Swiper>


  )
}

export default Categories


export const UlCategories = () => {

  const { data, isLoading, error } = useGetCategoriesQuery([])
  const categoryData = data

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки данных</div>
  return (
    <ul className='h-[500px] overflow-y-auto p-4 space-y-3'
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        borderRight: "1px solid #e5e7eb"
      }}
    >
      {categoryData?.data?.map((category) => {
        return (
          <li
            className='text-lg font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-800 hover:text-indigo-600'
            key={category.id}

          >
            {category?.categoryName}
          </li>
        )
      })}
    </ul>
  )
}
<style>{`
  ul::-webkit-scrollbar {
    display: none;
  }
`}</style>

