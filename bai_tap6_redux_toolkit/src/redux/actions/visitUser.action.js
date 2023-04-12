import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserToCheck } from "../../api/user";
import { setLoading } from "../reducers/setting.slice";
import { setVisitUser } from "../reducers/user.slice";

import { fetchUserPostByUser } from "./post.action";
import { FETCH_VISIT_USER_BY_ID } from "../constant/visitUser.constant";

export const fetchVisitUserById = createAsyncThunk(
  FETCH_VISIT_USER_BY_ID,
  async (userId, { dispatch }) => {
    let res = {};
    try {
      dispatch(setLoading(true));
      const user = await getUserToCheck(userId);
      if (user.id) {
        dispatch(setVisitUser(user));
        dispatch(fetchUserPostByUser(user.id));
        res = {
          error: false,
        };
      } else {
        res = {
          error: new Error("User not found"),
        };
      }
    } catch (err) {
      console.log(err);
      res = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return res;
  }
);
