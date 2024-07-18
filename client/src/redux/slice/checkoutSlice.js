import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

const checkoutSlice = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      state.shippingAddress = action.payload;
    },
    SAVE_BILLING_ADDRESS: (state, action) => {
      state.billingAddress = action.payload;
    },
  },
});

export const { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } =
  checkoutSlice.actions;

export const getShipping = (state) => state.checkOut.shippingAddress;
export const getBilling = (state) => state.checkOut.billingAddress;

export default checkoutSlice.reducer;
