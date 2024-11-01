// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItemsCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItemsCount: (state, action) => {
      state.cartItemsCount = action.payload;
    },
    clearCartAll: (state) => {
      state.cartItemsCount = 0;
    },
  },
});

export const { setCartItemsCount, clearCartAll } = cartSlice.actions;
export default cartSlice.reducer;
