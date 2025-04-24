import { URL } from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL}`,
        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const access_token = localStorage.getItem("access_token");
                if (access_token) {
                    headers.set("Authorization", `Bearer ${access_token}`);
                }
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getProfileById: builder.query({
            query: (id) => `/UserProfile/get-user-profile-by-id?id=${id}`
        }),
    })
})

export const { useGetProfileByIdQuery } = ProfileApi