import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_USER_LOGIN_LOCAL,
  HANDLE_LOGIN_USER,
  REGISTER_USER,
} from "../constants/user.constant";
import { addUser, getUserToCheck } from "@/api/user";
import { setLoading } from "@/redux/reducers/setting.slice";
import { IUser } from "@/types/user.type";
import { loginUser } from "../reducers/user.slice";

export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (user: IUser, { dispatch }) => {
    let response: {
      error?: boolean | unknown;
    } = {};

    try {
      dispatch(setLoading(true));
      const userLogin = await addUser(user);
      window.localStorage.clear();
      window.localStorage.setItem("id", userLogin.id);
      window.localStorage.setItem("name", userLogin.name);
      dispatch(loginUser(userLogin));
    } catch (err) {
      console.log(err);
      response.error = err;
    }
    dispatch(setLoading(false));
    return response;
  }
);
export const getUserLoginLocal = createAsyncThunk(
  GET_USER_LOGIN_LOCAL,
  async (id: number, { dispatch }) => {
    let response: {
      error?: boolean | unknown;
      user?: IUser;
    } = {};
    try {
      dispatch(setLoading(true));
      const user = await getUserToCheck(id);
      if (user.id) {
        response = {
          error: false,
          user: user,
        };
      } else {
        response.error = new Error("User not found");
      }
    } catch (err) {
      console.log(err);
      response.error = err;
    }
    dispatch(setLoading(false));
    return response;
  }
);
export const handleLoginUser = createAsyncThunk(
  HANDLE_LOGIN_USER,
  async ({ acc: string, pass: string }, { dispatch }) => {
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
