import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const authApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AUTH_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = authApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account", "Activities", "Token"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/api/accounts",
        method: "post",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) {}
      },
    }),
    logIn: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.email);
          formData.append("password", info.password);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      providesTags: ["Account", "Token"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
          window.location.reload();
        } catch (err) {}
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          window.location.reload();
        } catch (err) {}
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    getAccount: builder.query({
      query: (id) => ({
        url: `/api/accounts/${id}`,
        credentials: "include",
      }),
      providesTags: ["Account"],
    }),
    updateAccount: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/accounts/${id}`,
        credentials: "include",
        body: formData,
        method: "put",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    deleteAccount: builder.mutation({
      query: ({ id }) => ({
        url: `/api/accounts/${id}`,
        credentials: "include",
        method: "delete",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLogInMutation,
  useLogOutMutation,
  useSignUpMutation,
  useGetAccountQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = authApiSlice;
