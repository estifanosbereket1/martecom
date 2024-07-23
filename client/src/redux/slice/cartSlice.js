import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      // console.log(action.payload, "gggggggggggggg");
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.productName} items increased by one `, {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };

        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.productName} is Added to cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      // console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      // console.log(action.payload);

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.productName} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity == 1) {
        const mewCart = state.cartItems.filter(
          (product) => product.id != action.payload.id
        );
        state.cartItems = mewCart;
        toast.success(`${action.payload.productName} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_PRODUCT: (state, action) => {
      // console.log(action.payload);
      const newCart = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      state.cartItems = newCart;
      toast.success(`${action.payload.productName} removed from cart`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      toast.success("cart cleared", {
        position: "top-left",
      });
    },
    CALCULATE_TOTAL_PRICE: (state, action) => {
      const arr = [];
      state.cartItems.map((item) => {
        const { productPrice, cartQuantity } = item;
        const cartItemAmount = productPrice * cartQuantity;
        return arr.push(cartItemAmount);
      });
      const totalAmount = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalPrice = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY: (state, action) => {
      const arr = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        return arr.push(cartQuantity);
      });
      const totalQuantity = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_PRODUCT,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_TOTAL_PRICE,
  SAVE_URL,
} = cartSlice.actions;

export const getCartItems = (state) => state.cart.cartItems;
export const getCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const getCartTotalPrice = (state) => state.cart.cartTotalPrice;

export default cartSlice.reducer;
