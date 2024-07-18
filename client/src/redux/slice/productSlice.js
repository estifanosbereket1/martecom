import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SET_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    GET_PRODUCT: (state, action) => {
      const id = action.payload;
      console.log(action.payload);
      console.log(id);
      state.product = state.products.find((product) => product.id === id);
    },
    SET_PRICES: (state, action) => {
      const { products } = action.payload;
      const priceArray = [];
      products.map((product) => priceArray.push(product.productPrice));
      const minPrice = Math.min(...priceArray);
      const maxPrice = Math.max(...priceArray);

      state.maxPrice = maxPrice;
      state.minPrice = minPrice;
    },
  },
});

export const { SET_PRODUCTS, GET_PRODUCT, SET_PRICES } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
