import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0 },
  reducers: {
    add(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }

      state.total = state.items.reduce((total, item) => total + item.total, 0);
    },
    remove(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + item.total, 0);
    },
    increaseQuantity(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
      }

      state.total = state.items.reduce((total, item) => total + item.total, 0);
    },
    decreaseQuantity(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity -= 1;
        existingItem.total = existingItem.price * existingItem.quantity;

        if (existingItem.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }

      state.total = state.items.reduce((total, item) => total + item.total, 0);
    },
    updateTotal(state) {
      state.total = state.items.reduce((total, item) => total + item.total, 0);
    },
  },
});

export const { add, remove, increaseQuantity, decreaseQuantity, updateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
