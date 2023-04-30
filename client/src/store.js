import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./features/productsSlice";
import { productsApi } from "./features/productsApi";

const store = configureStore({
	reducer: {
		products: productsReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());

export default store;
