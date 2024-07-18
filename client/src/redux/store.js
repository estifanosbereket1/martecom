import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filteredReducer from "./slice/filteredSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderSlice from "./slice/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filteredReducer,
  cart: cartReducer,
  checkOut: checkoutReducer,
  order: orderSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
