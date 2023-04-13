import { addUser } from "../../api/user";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLogin } from "../../api/user";
import { setLoading } from "../reducers/setting.slice";
import {
  HANDLE_LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../constant/authUser.constant";

export const handleLoginUser = createAsyncThunk(
  HANDLE_LOGIN_USER,
  async ({ acc, pass }, { dispatch }) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const users = await getUserLogin(acc, pass);

      window.localStorage.clear();
      window.localStorage.setItem("id", users[0].id);
      window.localStorage.setItem("name", users[0].name);
      response = {
        error: false,
        user: users[0],
      };
    } catch (err) {
      console.log(err);
      response = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return response;
  }
);
export const logOutUser = createAsyncThunk(LOGOUT_USER, (_, { dispatch }) => {
  window.localStorage.clear();
});

export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (user, { dispatch }) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const userLogin = await addUser(user);

      window.localStorage.clear();
      window.localStorage.setItem("id", userLogin.id);
      window.localStorage.setItem("name", userLogin.name);
      response = {
        error: false,
      };
    } catch (err) {
      console.log(err);
      response = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return response;
  }
);
