"use client"
import { CategoryCard } from '@/components/shared/categoryCard'
import { useGetCategoriesQuery } from '@/store/api/categoryApiSlice'
import React from 'react'

const Categories = () => {
  const { data, isLoading, error } = useGetCategoriesQuery([])
  const categoryData = data

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки данных</div>

  return (
    <div  className='flex overflow-x-auto w-[95%] m-auto mb-30 flex-nowrap'>
      {categoryData?.data?.map((category) => {
        return (
          <CategoryCard el={category} key={category.id} />
        )
      })}
    </div>
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

