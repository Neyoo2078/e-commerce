import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  User: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    Signin(state, action) {
      state.User = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    Signout(state, action) {
      state.User = null;
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
    },
  },
});

export const { Signin, Signout } = AuthSlice.actions;
export default AuthSlice.reducer;
