import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const bikeApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token"); // ✅ read on every request
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBrands: builder.query<any[], void>({
      query: () => "/brands",
    }),
    getModels: builder.query<any[], void>({
      query: () => "/models",
      transformResponse: (response: { result: any }) => response.result,
    }),
    getBikeTypes: builder.query<any[], void>({
      query: () => "/bikeTypes",
    }),
    addBrand: builder.mutation<any, { brandName: string; user_id: number }>({
      query: ({ brandName, user_id }) => ({
        url: "/brands",
        method: "POST",
        body: { brandName, user_id },
      }),
    }),
    addModel: builder.mutation<any, { modelName: string; brand_id: number }>({
      query: ({ modelName, brand_id }) => ({
        url: "/models",
        method: "POST",
        body: { modelName, brand_id },
      }),
    }),
    addBike: builder.mutation<any, any>({
      query: (newBike) => ({
        url: "/bikeLists",
        method: "POST",
        body: newBike,
      }),
    }),
    addReview: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/reviews",
        method: "POST",
        body: formData,
      }),
    }),
    getAllBikes: builder.query<
      any,
      { brandId: number; modelId: number; typeId: number }
    >({
      query: ({ brandId, modelId, typeId }) => ({
        url: "/bikeLists",
        params: { brandId, modelId, typeId },
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetModelsQuery,
  useGetBikeTypesQuery,
  useAddBrandMutation,
  useAddModelMutation,
  useAddBikeMutation,
  useAddReviewMutation,
  useGetAllBikesQuery,
} = bikeApi;
