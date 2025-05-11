// app/redux/api/uploadApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }), // Change baseUrl as needed
  endpoints: (builder) => ({
    uploadCoverImage: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "upload-cover", // Your upload endpoint
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadCoverImageMutation } = uploadApi;
