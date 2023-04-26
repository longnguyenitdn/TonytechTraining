import { createSlice } from "@reduxjs/toolkit";
import { logOutUser } from "../actions/user.action";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginUser: {},
  },
  reducers: {
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.loginUser = {};
    });
  },
});
export const { setLoginUser } = userSlice.actions;
export default userSlice.reducer;
