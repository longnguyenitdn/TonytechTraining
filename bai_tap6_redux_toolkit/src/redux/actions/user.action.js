import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserToCheck } from "../../api/user";
import { setLoading } from "../reducers/setting.slice";
import { GET_USER_LOGIN_LOCAL } from "../constant/authUser.constant";

export const getUserLoginLocal = createAsyncThunk(
  GET_USER_LOGIN_LOCAL,
  async (id, { dispatch }) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const user = await getUserToCheck(id);
      if (user.id) {
        response = {
          error: false,
          user: user,
        };
      } else {
        response = {
          error: new Error("User not found"),
        };
      }
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
