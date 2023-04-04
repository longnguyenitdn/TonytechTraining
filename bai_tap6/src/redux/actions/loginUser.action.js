import { setLoading } from "./setting.action";

export const fetchLoginUser = (data) => {
  return {
    type: "loginUser/fetchLoginUser",
    payload: data,
  };
};
export const fetchLoginUserByAuth = (user) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      dispatch(fetchLoginUser(user));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};
