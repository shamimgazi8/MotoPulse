// app/redux/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Bookmark } from "@/types/bookmark"; // Import the Bookmark type
export const bookmarkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBookmarks: builder.query<Bookmark[], void>({
      query: () => "/bookmark",
      transformResponse: (response: { bookmarks: Bookmark[] }) =>
        response.bookmarks,
    }),
  }),
});

export const { useGetBookmarksQuery } = bookmarkApi;
