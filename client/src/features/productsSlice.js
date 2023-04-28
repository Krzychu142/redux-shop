import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  stats: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
