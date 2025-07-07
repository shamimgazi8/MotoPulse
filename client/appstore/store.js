// store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import { api } from "@/service/api";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer, // <-- add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // <-- add RTK Query middleware
});

export default store;
