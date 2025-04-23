import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GET_FILTERED_PRODUCTS, GET_PRODUCT, GET_PRODUCT_BY_ID } from '../constants/productConstant';


export const ProductApi = createApi ({
    reducerPath: "productCatch",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://store-api.softclub.tj`
    }),
    tagTypes: ["Product"],
    endpoints: (builder)=>({
        getProducts : builder.query({
            query: ()=> GET_PRODUCT
        }),
        getProductById : builder.query({
            query: (id)=> `${GET_PRODUCT_BY_ID}${id}`
        }),
        getFilterProducts : builder.query({
            query: (params)=> `/Product/get-products?MinPrice=${params.MinPrice || ""}&MaxPrice=${params.MaxPrice || ""}&BrandId=${params.BrandId || ""}&CategoryId=${params.CategoryId || ""}`
        }),
    })
})

export const {useGetProductsQuery ,useGetProductByIdQuery, useGetFilterProductsQuery } = ProductApi