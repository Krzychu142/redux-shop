import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        toast.info('increased quantity of item in cart', {
          position: 'bottom-left',
        });
        state.cartItems[itemIndex].cartQuantity++;
        state.cartTotalQuantity++;
        state.cartTotalAmount += action.payload.price;
      } else {
        toast.success(`${action.payload.name} added to cart`, {
          position: 'bottom-left',
        });
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
        state.cartTotalQuantity++;
        state.cartTotalAmount += action.payload.price;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
