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
    tagTypes:["userProfile"],
    endpoints: (builder) => ({
        getProfileById: builder.query({
            query: (id) => `/UserProfile/get-user-profile-by-id?id=${id}`
        }),
        updateUserProfile: builder.mutation({
            query: (formData) => ({
                url:"/UserProfile/update-user-profile",
                method: "PUT",
                body: formData
            }),
            invalidatesTags:["userProfile"]
        })
    })
})

export const { useGetProfileByIdQuery , useUpdateUserProfileMutation} = ProfileApi