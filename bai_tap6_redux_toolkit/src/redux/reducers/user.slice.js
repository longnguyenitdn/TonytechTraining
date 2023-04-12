import { createSlice } from "@reduxjs/toolkit";
import {
  handleLoginUser,
  logOutUser,
  registerUser,
} from "../actions/authUser.action";
import { getUserLoginLocal } from "../actions/user.action";
import { fetchVisitUserById } from "../actions/visitUser.action";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    visitUser: {},
    loginUser: {},
  },
  reducers: {
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },

    setVisitUser: (state, action) => {
      state.visitUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(handleLoginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.loginUser = action.payload;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(getUserLoginLocal.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserLoginLocal.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(fetchVisitUserById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVisitUserById.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});

export const { fetchLoginUser, setVisitUser, setLoginUser } = userSlice.actions;
export default userSlice.reducer;
