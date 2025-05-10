// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "@/service/userApi";

export const store = configureStore({
  reducer: {
    // RTK Query reducer
    [UserApi.reducerPath]: UserApi.reducer,
    // add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
  devTools: process.env.NODE_ENV !== "production", // enable Redux DevTools in development only
});

// Types for usage throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
