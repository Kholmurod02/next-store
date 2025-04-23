import { URL } from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
    ADD_PRODUCT_TO_CART,
  CLEAR_CART, 
  DELETE_PRODUCT_FROM_CART, 
  GET_PRODUCT_FROM_CART, 
  INCREASE_PRODUCT_IN_CART, 
  REDUCE_PRODUCT_IN_CART 
} from "../constants/cartConstants";
// import { useRouter } from "next/navigation";

// const router = useRouter()

export const CartApi = createApi({
    reducerPath: "cartApi", // Changed from "cartCatch" to more conventional "cartApi"
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL}`,
        prepareHeaders: (headers) => {
            // Check if window is defined (for SSR compatibility)
            if (typeof window !== "undefined") {
                const access_token = localStorage.getItem("access_token");
                if (access_token) {
                    headers.set("Authorization", `Bearer ${access_token}`);
                }
            }
            return headers;
        }
    }),
    tagTypes: ["Cart"], // Convention is to use singular and capitalize
    endpoints: (builder) => ({
        getProductsFromCart: builder.query({
            query: () => GET_PRODUCT_FROM_CART,
            providesTags: ["Cart"] // Match the tagTypes name
        }),
        increaseProduct: builder.mutation({
            query: (id) => ({
                url: `${INCREASE_PRODUCT_IN_CART}${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Cart"]
        }),
        reduceProduct: builder.mutation({
            query: (id) => ({
                url: `${REDUCE_PRODUCT_IN_CART}${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["Cart"]
        }),
        deleteProductFromCart: builder.mutation({
            query: (id) => ({
                url: `${DELETE_PRODUCT_FROM_CART}${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: CLEAR_CART,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
        }),
        addProductToCart: builder.mutation({
            query: (id) => ({
                url: `${ADD_PRODUCT_TO_CART}${id}`,
                method: "POST"        
            }),
            invalidatesTags: ["Cart"]

        }),
    })
});

export const { 
    useGetProductsFromCartQuery, 
    useIncreaseProductMutation,
    useReduceProductMutation, 
    useDeleteProductFromCartMutation,
    useClearCartMutation,
    useAddProductToCartMutation
} = CartApi;