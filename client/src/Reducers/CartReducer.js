import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
  address: localStorage.getItem('address')
    ? JSON.parse(localStorage.getItem('address'))
    : [],
  PaymentMethod: localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : [],
};

const CartSlice = createSlice({
  name: 'CartSlice',
  initialState,
  reducers: {
    AddToCart(state, action) {
      const newitems = action.payload;
      const exist = state.Cart.find((item) => item._id === newitems._id);
      const update = exist
        ? state.Cart.map((item) => (item._id === exist._id ? newitems : item))
        : [...state.Cart, action.payload];
      state.Cart = update;
      localStorage.setItem('cart', JSON.stringify(update));
    },
    RemoveFromCart(state, action) {
      const filterItem = state.Cart.filter(
        (items) => items._id !== action.payload
      );
      state.Cart = filterItem;
      localStorage.setItem('cart', JSON.stringify(filterItem));
    },
    ShippingA(state, action) {
      state.address = action.payload;
      localStorage.setItem('address', JSON.stringify(action.payload));
    },
    PaymentM(state, action) {
      state.PaymentMethod = action.payload;
      localStorage.setItem('payment', JSON.stringify(action.payload));
    },
    ClearCarts(state, action) {
      state.Cart = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { AddToCart, RemoveFromCart, ShippingA, PaymentM, ClearCarts } =
  CartSlice.actions;
export default CartSlice.reducer;
