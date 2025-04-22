// import { BASIC_URL } from '@/utils/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GET_BRANDS, GET_CATEGORIES } from '../constants/categoryConstants';


export const CategoryApi = createApi ({
    reducerPath: "categoryCatch",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://store-api.softclub.tj`
    }),
    // tagTypes: ["categories"],
    endpoints: (builder)=>({
        getCategories : builder.query({
            query: ()=> GET_CATEGORIES
        }),
        getBrands : builder.query({
            query: ()=> GET_BRANDS
        })
    })
})

export const {useGetCategoriesQuery,useGetBrandsQuery} = CategoryApi