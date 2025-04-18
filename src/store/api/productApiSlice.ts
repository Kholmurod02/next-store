import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GET_PRODUCT, GET_PRODUCT_BY_ID } from '../constants/productConstant';


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
        })
    })
})

export const {useGetProductsQuery ,useGetProductByIdQuery } = ProductApi