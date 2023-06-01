import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [], isLoading: false, error: null };
const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    fetchAll(state, action) {
      state.products = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { fetchAll, isLoading } = productSlice.actions;
export default productSlice.reducer;
