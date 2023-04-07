import { getUserToCheck } from "../../api/user";
import { setLoginUser } from "./authUser.action";
import { setLoading } from "./setting.action";

export const getUserLoginLocal = (id) => {
  return async (dispatch) => {
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
  };
};
