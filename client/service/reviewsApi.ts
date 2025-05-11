import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getUserReviews: builder.query<any, string>({
      query: (userId) => `/reviews/user/${userId}`,
      providesTags: ["Reviews"],
    }),
    updateReview: builder.mutation<
      any,
      { id: string; review: string; user_id: string }
    >({
      query: ({ id, review, user_id }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: { user_id, review },
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation<any, { id: string; user_id: string }>({
      query: ({ id, user_id }) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
        body: { user_id },
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetUserReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
