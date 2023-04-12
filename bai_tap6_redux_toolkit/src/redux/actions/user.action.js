import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserToCheck } from "../../api/user";
import { setLoading } from "../reducers/setting.slice";
import { setLoginUser } from "../reducers/user.slice";

export const getUserLoginLocal = createAsyncThunk(
  "user/getUserLoginLocal",
  async (id, { dispatch }) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const user = await getUserToCheck(id);
      if (user.id) {
        dispatch(setLoginUser(user));
        response = {
          error: false,
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
