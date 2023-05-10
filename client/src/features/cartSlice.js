import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const findItemIndexById = (cartItems, itemId) =>
  cartItems.findIndex((item) => item.id === itemId);

const calculateTotalQuantity = (cartItems) =>
  cartItems.reduce((total, item) => total + item.cartQuantity, 0);

const calculateTotalAmount = (cartItems) =>
  cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);

let initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  cartItems: initialCartItems,
  cartTotalQuantity: calculateTotalQuantity(initialCartItems),
  cartTotalAmount: calculateTotalAmount(initialCartItems),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = findItemIndexById(state.cartItems, action.payload.id);
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
    decrementItem(state, action) {
      const itemIndex = findItemIndexById(state.cartItems, action.payload.id);
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity--;
          state.cartTotalQuantity--;
          state.cartTotalAmount -= action.payload.price;
          toast.info('decreased quantity of item in cart', {
            position: 'bottom-left',
          });
        } else {
          toast.error(`${action.payload.name} removed from cart`, {
            position: 'bottom-left',
          });
          state.cartItems.splice(itemIndex, 1);
          state.cartTotalQuantity--;
          state.cartTotalAmount -= action.payload.price;
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const itemIndex = findItemIndexById(state.cartItems, action.payload.id);
      if (itemIndex >= 0) {
        const itemToRemove = state.cartItems[itemIndex];
        state.cartItems.splice(itemIndex, 1);
        state.cartTotalQuantity -= itemToRemove.cartQuantity;
        state.cartTotalAmount -= itemToRemove.price * itemToRemove.cartQuantity;
        toast.error(`${itemToRemove.name} removed from cart`, {
          position: 'bottom-left',
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decrementItem } =
  cartSlice.actions;

export default cartSlice.reducer;
