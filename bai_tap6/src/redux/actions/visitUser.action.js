import { getUserToCheck } from "../../api/user";
import { setLoading } from "./setting.action";

export const fetchVisitUser = (data) => {
  return {
    type: "visitUser/fetchVisitUser",
    payload: data,
  };
};
export const fetchVisitUserById = (userId) => {
  return async (dispatch) => {
    let user = {};
    try {
      dispatch(setLoading(true));
      user = await getUserToCheck(userId);
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
    return user;
  };
};
