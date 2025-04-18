"use client"

import ProductCard from '@/components/shared/productCard'
import { useGetProductsQuery } from '@/store/api/productApiSlice'
import React from 'react'

const Products = () => {
  const {data,isLoading,error} = useGetProductsQuery('')

  const productData = data?.data?.products || []

  console.log(productData);
  
  return (
    <div>
      {
        productData.map((el)=>{
          return (
            <ProductCard el={el}  key={el.id}/>
          )
        })
      }
    </div>
  )
}

export default Products