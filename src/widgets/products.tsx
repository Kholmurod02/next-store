"use client"

import ProductCard from '@/components/shared/productCard'
import { useGetProductsQuery } from '@/store/api/productApiSlice'
import { IProduct } from '@/types'
import React from 'react'

const Products = () => {
  const {data,isLoading,error} = useGetProductsQuery('')

  const productData = data?.data?.products || []

  
  return (
    <>
      {
        productData.map((el: IProduct)=>{
          return (
            <ProductCard el={el}  key={el.id}/>
          )
        })
      }
    </>
  )
}

export default Products