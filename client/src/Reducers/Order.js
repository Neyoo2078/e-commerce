import { createSlice } from '@reduxjs/toolkit';

const initialState = { order: {}, OLoading: true };

const Order = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    FetchOrder(state, action) {
      state.order = action.payload;
      localStorage.setItem('order', JSON.stringify(action.payload));
    },
    OrderLoading(state, action) {
      state.OLoading = action.payload;
    },
  },
});

export const { FetchOrder, OrderLoading } = Order.actions;
export default Order.reducer;
