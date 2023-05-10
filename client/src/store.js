import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';
import cartReducer from './features/cartSlice';
import authReducer, { loadUser } from './features/authSlice';
import passwordResetReducer from './features/passwordResetSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    passwordReset: passwordResetReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(loadUser());

export default store;
