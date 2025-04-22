import { URL } from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LOGIN } from "../constants/authConstants";
import { useRouter } from "next/navigation";




export const AuthApi = createApi({
    reducerPath: "authApi",  
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        prepareHeaders: (headers) => {
            const access_token = localStorage.getItem("access_token");
            if (access_token) {
                headers.set("Authorization", `Bearer ${access_token}`);
            }
            return headers;
        }
    }),
    tagTypes:["user"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: LOGIN,
                method: "POST",
                body: body
            }),
            invalidatesTags:["user"]
        })
    })
})

export const { useLoginMutation } = AuthApi