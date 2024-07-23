import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filteredSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTERED_PRODUCTS: (state, action) => {
      const { products, search } = action.payload;
      const tempFilter = products.filter(
        (product) =>
          product.productName.toLowerCase().includes(search.toLowerCase()) ||
          product.productCategory.toLowerCase().includes(search.toLowerCase())
      );
      //better code
      //if empty set the products to all products but consider the filter
      // const tempo = state.filteredProducts.filter(
      //   (product) =>
      //     product.productName.toLowerCase().includes(search.toLowerCase()) ||
      //     product.productCategory.toLowerCase().includes(search.toLowerCase())
      // );
      state.filteredProducts = tempFilter;
    },
    SORTED_PRODUCTS: (state, action) => {
      const { products, sort } = action.payload;
      let tempProduct = [...products];
      switch (sort) {
        case "Latest":
          tempProduct = products;
          break;
        case "HighestPrice":
          tempProduct = tempProduct.sort(
            (a, b) => b.productPrice - a.productPrice
          );
          break;
        case "LowestPrice":
          tempProduct = tempProduct.sort(
            (a, b) => a.productPrice - b.productPrice
          );
          break;
        case "A-Z":
          tempProduct = tempProduct.sort((a, b) =>
            a.productName.localeCompare(b.productName)
          );
          break;
        case "Z-A":
          tempProduct = tempProduct.sort((a, b) =>
            b.productName.localeCompare(a.productName)
          );
          break;
        default:
          tempProduct = products;
      }
      state.filteredProducts = tempProduct;
      // console.log(tempProduct);
    },
    FILTER_BY_CAT: (state, action) => {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category == "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.productCategory == category
        );
      }

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      // console.log(action.payload);
      let tempProducts = [];
      tempProducts = products.filter(
        (product) => product.productPrice <= price
      );
      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTERED_PRODUCTS,
  SORTED_PRODUCTS,
  FILTER_BY_CAT,
  FILTER_BY_PRICE,
} = filteredSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filteredSlice.reducer;
