import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: [],
  PLoading: true,
};
const PDreducer = createSlice({
  name: 'PDreducer',
  initialState,
  reducers: {
    FetchDetails(state, action) {
      state.value = action.payload;
    },
    Ploading(state, action) {
      state.PLoading = action.payload;
    },
  },
});

export const { FetchDetails, Ploading } = PDreducer.actions;
export default PDreducer.reducer;
