import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define types
interface Brand {
  id: number;
  brandName: string;
}

interface BikeType {
  id: number;
  name: string;
}

// Create API slice
export const brand_model_typeApi = createApi({
  reducerPath: "navApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brands",
    }),
    getBikeTypes: builder.query<BikeType[], void>({
      query: () => "/bikeTypes",
      transformResponse: (response: { result: BikeType[] }) => response.result,
    }),
  }),
});

export const { useGetBrandsQuery, useGetBikeTypesQuery } = brand_model_typeApi;
