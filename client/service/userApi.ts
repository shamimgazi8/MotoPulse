// services/api.ts
"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<any, string>({
      query: (id) => `users/${id}`,
    }),
    createUser: builder.mutation<any, Partial<any>>({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    LogoutUser: builder.mutation<any[], void>({
      query: (credentials) => ({
        url: "auth/logout",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUser: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `users/profile/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutUserMutation,
} = UserApi;
