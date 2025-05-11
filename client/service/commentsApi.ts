// commentsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addComment: builder.mutation<
      Comment,
      { content: string; reviewId: string }
    >({
      query: ({ content, reviewId }) => ({
        url: "/comments",
        method: "POST",
        body: { content, review_id: reviewId },
      }),
    }),
    // other endpoints...
  }),
});

export const { useAddCommentMutation } = commentsApi;
