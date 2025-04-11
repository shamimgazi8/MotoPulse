import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('cartItems')) || []
      : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);

      // Update localStorage after removing item
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    incrementQuantity: (state, action) => {
      const idToUpdate = action.payload;
      const itemToUpdate = state.items.find(item => item.id === idToUpdate);
      if (itemToUpdate) {
        itemToUpdate.quantity++;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
    decrementQuantity: (state, action) => {
      const idToUpdate = action.payload;
      const itemToUpdate = state.items.find(item => item.id === idToUpdate);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update localStorage
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
