import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userName: null,
  email: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { email, userId, userName } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userId = userId;
      state.userName = userName;
    },
  },
});

export const { SET_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserName = (state) => state.auth.userName;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
