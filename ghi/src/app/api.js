import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApi";

export const activitiesApi = createApi({
  reducerPath: "activities",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AUTH_API_HOST,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const selector = authApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["ActivitiesList"],
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => "/api/activities/",
      credentials: "include",
      providesTags: ["ActivitiesList"],
    }),
    createActivity: builder.mutation({
      query: (data) => ({
        url: "/api/activities/",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["ActivitiesList", "OneActivity"],
    }),
    getOneActivity: builder.query({
      query: (id) => ({
        url: `/api/activities/${id}`,
        credentials: "include",
      }),
      providesTags: ["OneActivity"],
    }),
    updateActivity: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/activities/${id}`,
        credentials: "include",
        body: data,
        method: "put",
      }),
      invalidatesTags: ["ActivitiesList", "OneActivity"],
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `/api/activities/${id}`,
        credentials: "include",
        method: "delete",
      }),
      invalidatesTags: ["ActivitiesList"],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useCreateActivityMutation,
  useGetOneActivityQuery,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activitiesApi;
