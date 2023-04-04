import { SET_LOADING } from "../constant/setting.constant";

export const setLoading = (status) => {
  return {
    type: SET_LOADING,
    payload: status,
  };
};
