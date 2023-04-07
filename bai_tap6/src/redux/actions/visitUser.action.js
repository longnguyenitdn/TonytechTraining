import { getUserToCheck } from "../../api/user";
import { VISITUSER_SETVISITUSER } from "../constant/visitUser.constant";
import { fetchUserPostByUser } from "./post.action";
import { setLoading } from "./setting.action";

export const setVisitUser = (data) => {
  return {
    type: VISITUSER_SETVISITUSER,
    payload: data,
  };
};
export const fetchVisitUserById = (userId) => {
  return async (dispatch) => {
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
  };
};
