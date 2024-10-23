import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productID, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productID === productID);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productID, quantity });
      }

      state.itemCount += quantity; // Update total item count
    },
    // You can add more reducers here (e.g., removeItem, clearCart)
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
