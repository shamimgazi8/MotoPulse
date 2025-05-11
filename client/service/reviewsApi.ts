import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
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
    getAllReviews: builder.query<any[], void>({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),

    getReviewBySlug: builder.query<any, string>({
      query: (slug) => `/reviews/${slug}`,
    }),

    getReviewsByBikeId: builder.query<any[], number>({
      query: (bikeId) => `/reviews/bike/${bikeId}`,
    }),

    addReview: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/reviews",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Reviews"],
    }),

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

    getFilteredReviews: builder.query<
      { result: any[]; count: number },
      {
        page: number;
        limit?: number;
        ccRange?: [number, number];
        brand?: string;
        bikeType?: string;
        sortby?: string;
      }
    >({
      query: ({ page, limit = 5, ccRange, brand, bikeType, sortby }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (ccRange) {
          params.append("ccMin", String(ccRange[0]));
          params.append("ccMax", String(ccRange[1]));
        }
        if (brand) params.append("brandName", brand);
        if (bikeType) params.append("type", bikeType);
        if (sortby) params.append("sortby", sortby);

        return `/reviews?${params.toString()}`;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.result.push(...newItems.result);
        currentCache.count = newItems.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          JSON.stringify(currentArg) !== JSON.stringify(previousArg)
        );
      },
    }),

    getTrendingBikes: builder.query<any[], void>({
      query: () => `reviews?page=1&limit=5&sortby=popular`,
      transformResponse: (response: any) => {
        return (response.result || []).map((bike: any) => ({
          id: bike.id,
          name: bike.bike.name,
          imgUrl: bike.coverPhoto,
          brand: bike.bike.brand.brandName,
          likeCount: bike.like_count,
          slug: bike.slug,
        }));
      },
    }),

    getUserLikes: builder.query<any[], string>({
      query: (userId) => `/like/${userId}`,
    }),

    toggleLike: builder.mutation<any, { reviewId: number; liked: boolean }>({
      query: ({ reviewId, liked }) => ({
        url: `/like/${reviewId}`,
        method: liked ? "DELETE" : "POST",
        body: { like: !liked },
      }),
    }),

    getBookmarks: builder.query<any[], void>({
      query: () => `/bookmark`,
    }),

    toggleBookmark: builder.mutation<
      any,
      { review_id: number; bookmarked: boolean }
    >({
      query: ({ review_id, bookmarked }) => ({
        url: `/bookmark`,
        method: bookmarked ? "DELETE" : "POST",
        body: { review_id },
      }),
    }),

    // New endpoint for live search
    searchReviews: builder.query<{ result: any[] }, string>({
      query: (query) => `/reviews?search=${encodeURIComponent(query)}`,
    }),
    getReviewsByBrand: builder.query<any[], string>({
      query: (brandName) => `/reviews/brand/${brandName}`,
      providesTags: ["Reviews"],
    }),

    getReviewsByType: builder.query<any[], string>({
      query: (typeName) => `/reviews/type/${typeName}`,
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewBySlugQuery,
  useAddReviewMutation,
  useGetUserReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetFilteredReviewsQuery,
  useGetReviewsByBikeIdQuery,
  useGetTrendingBikesQuery,
  useGetUserLikesQuery,
  useToggleLikeMutation,
  useGetBookmarksQuery,
  useToggleBookmarkMutation,
  useSearchReviewsQuery,
  useGetReviewsByBrandQuery,
  useGetReviewsByTypeQuery,
} = reviewsApi;
