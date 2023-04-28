import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./features/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

store.dispatch(productsFetch());

export default store;
