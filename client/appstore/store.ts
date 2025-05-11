import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "@/service/userApi";
import { reviewsApi } from "@/service/reviewsApi";
import { bookmarkApi } from "@/service/bookmarkApi";
import { uploadApi } from "@/service/uploadApi";
import { brand_model_typeApi } from "@/service/brand_model_typeApi";
import { bikeApi } from "@/service/bikeApi";
import { commentsApi } from "@/service/commentsApi";

export const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [brand_model_typeApi.reducerPath]: brand_model_typeApi.reducer,
    [bikeApi.reducerPath]: bikeApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    // Add more reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UserApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(bookmarkApi.middleware)
      .concat(uploadApi.middleware)
      .concat(brand_model_typeApi.middleware)
      .concat(bikeApi.middleware)
      .concat(commentsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Types for usage throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
