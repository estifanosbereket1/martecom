import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  totalOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ADD_ORDERS: (state, action) => {
      // console.log(action.payload);
      state.orders = action.payload;
    },
    CALC_TOTAL_ORDERS: (state, action) => {
      const arr = [];
      state.orders.map((item) => {
        const { orderAmount } = item;
        return arr.push(orderAmount);
      });
      const totalQuantity = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrder = totalQuantity;
    },
  },
});

export const { ADD_ORDERS, CALC_TOTAL_ORDERS } = orderSlice.actions;
export const allOrders = (state) => state.order.orders;
export const totalOrders = (state) => state.order.totalOrder;

export default orderSlice.reducer;
