"use client"
import { CategoryCard } from '@/components/shared/categoryCard'
import { useGetCategoriesQuery } from '@/store/api/categoryApiSlice'
import React from 'react'

const Categories = () => {
    const {data,isLoading,error} = useGetCategoriesQuery([])
    const categoryData = data

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка загрузки данных</div>
    
  return (
    <div className=' flex w-[98%] overflow-x-scroll items-center gap-10 p-5'>
        {categoryData?.data?.map((category)=>{
            return (
                <CategoryCard el={category} key={category.id}/>
            )
        })}
    </div>
  )
}

export default Categories