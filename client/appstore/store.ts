import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "@/service/userApi";
import { reviewsApi } from "@/service/reviewsApi";
import { bookmarkApi } from "@/service/bookmarkApi";
import { uploadApi } from "@/service/uploadApi";

export const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    // Add more reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UserApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(bookmarkApi.middleware)
      .concat(uploadApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Types for usage throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
