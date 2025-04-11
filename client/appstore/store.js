// store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';

// assuming you have a cart reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // other reducers can be added here
  },
});

export default store;
