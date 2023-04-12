import { createSlice } from "@reduxjs/toolkit";
import { handleLoginUser, logOutUser } from "../actions/authUser.action";
import { getUserLoginLocal } from "../actions/user.action";
import { fetchVisitUserById } from "../actions/visitUser.action";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    visitUser: {},
    loginUser: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginUser.pending, (state, action) => {
        state.loginUser = {};
      })
      .addCase(handleLoginUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.loginUser = {};
        } else {
          state.loginUser = action.payload.user;
        }
      })

      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loginUser = {};
      })

      .addCase(getUserLoginLocal.pending, (state, action) => {
        state.loginUser = {};
      })
      .addCase(getUserLoginLocal.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.loginUser = {};
        } else {
          state.loginUser = action.payload.user;
        }
      })
      .addCase(fetchVisitUserById.pending, (state, action) => {
        state.visitUser = {};
      })
      .addCase(fetchVisitUserById.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.visitUser = {};
        } else {
          state.visitUser = action.payload.user;
        }
      });
  },
});

export default userSlice.reducer;
