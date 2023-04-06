import { getUserLogin } from "../../api/user";
import { setLoading } from "./setting.action";

export const fetchLoginUser = (data) => {
  return {
    type: "loginUser/fetchLoginUser",
    payload: data,
  };
};
export const fetchLoginUserByAuth = (acc, pass) => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const users = await getUserLogin(acc, pass);
      dispatch(fetchLoginUser(users[0]));
      window.localStorage.clear();
      window.localStorage.setItem("id", users[0].id);
      window.localStorage.setItem("name", users[0].name);
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
  };
};
export const LogOutUser = () => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      window.localStorage.clear();
      await dispatch(fetchLoginUser({}));
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
  };
};
