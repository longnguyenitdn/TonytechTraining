import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginUser: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
