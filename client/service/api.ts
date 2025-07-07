// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    // Brands
    getBrands: builder.query<any[], void>({
      query: () => "/brands",
    }),
    createBrand: builder.mutation<any, string>({
      query: (newBrand) => ({
        url: "/brands",
        method: "POST",
        body: { brandName: newBrand },
      }),
    }),

    // Models
    getModelsByBrand: builder.query<any[], void>({
      query: () => "/models",
    }),
    createModel: builder.mutation<any, { brandId: number; newModel: string }>({
      query: ({ brandId, newModel }) => ({
        url: `/brands/${brandId}/models`,
        method: "POST",
        body: { modelName: newModel },
      }),
    }),

    // Bike Types
    getBikeTypes: builder.query<{ result: any[] }, void>({
      query: () => "/bikeTypes",
    }),
    createBikeType: builder.mutation<any, string>({
      query: (newType) => ({
        url: "/bikeTypes",
        method: "POST",
        body: { name: newType },
      }),
    }),

    // Reviews
    createReview: builder.mutation<
      any,
      {
        bikeId: number;
        userId: number;
        review: string;
        weight: number;
        engineCapacity: number;
        torque: number;
        horsePower: number;
        coverPhoto?: string;
      }
    >({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
    }),
    getFilteredReviews: builder.query<
      { result: any[]; count: number },
      {
        page: number;
        limit: number;
        brand?: string;
        type?: string;
        sortby?: string;
        ccRange?: [number, number];
      }
    >({
      query: ({ page, limit, brand, type, sortby, ccRange }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (ccRange) {
          params.append("ccMin", String(ccRange[0]));
          params.append("ccMax", String(ccRange[1]));
        }
        if (brand) params.append("brandName", brand);
        if (type) params.append("type", type);
        if (sortby) params.append("sortby", sortby);

        return `/reviews?${params.toString()}`;
      },
    }),
    getTrendingBikes: builder.query({
      query: () => "/reviews?page=1&limit=5&sortby=popular",
    }),
    getReviewFromSearch: builder.query<any, string>({
      query: (searchQuery) => `/reviews?search=${searchQuery}`,
    }),
    getReviews: builder.query<any, void>({
      query: () => "/reviews",
    }),

    getReviewsByBike: builder.query<any, number>({
      query: (bikeId) => `/bikes/${bikeId}/reviews`,
    }),

    getReviewByBikeId: builder.query<any, number>({
      query: (bikeId) => `/reviews/bike/${bikeId}`,
    }),

    getReviewsByUser: builder.query<any, number>({
      query: (userId) => `/reviews/user/${userId}`,
    }),

    getReviewByBrand: builder.query<any, string>({
      query: (brandName) => `/reviews?brandName=${brandName}`,
    }),

    getReviewByType: builder.query<any, string>({
      query: (type) => `/reviews?type=${type}`,
    }),

    likeReview: builder.mutation<any, { reviewId: number; userId: number }>({
      query: ({ reviewId, userId }) => ({
        url: `/reviews/${reviewId}/like`,
        method: "POST",
        body: { userId },
      }),
    }),

    unlikeReview: builder.mutation<any, { reviewId: number; userId: number }>({
      query: ({ reviewId, userId }) => ({
        url: `/reviews/${reviewId}/like`,
        method: "DELETE",
        body: { userId },
      }),
    }),

    // Generic API call (rarely needed with RTK, but just in case)
    makeRequest: builder.mutation<
      any,
      { method: string; endpoint: string; data?: any }
    >({
      query: ({ method, endpoint, data }) => ({
        url: endpoint,
        method,
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useGetModelsByBrandQuery,
  useCreateModelMutation,
  useGetBikeTypesQuery,
  useCreateBikeTypeMutation,
  useCreateReviewMutation,
  useGetFilteredReviewsQuery,
  useGetTrendingBikesQuery,
  useGetReviewFromSearchQuery,
  useGetReviewsByBikeQuery,
  useGetReviewsQuery,
  useGetReviewByBikeIdQuery,
  useGetReviewsByUserQuery,
  useGetReviewByBrandQuery,
  useGetReviewByTypeQuery,
  useLikeReviewMutation,
  useUnlikeReviewMutation,
  useMakeRequestMutation,
} = api;
