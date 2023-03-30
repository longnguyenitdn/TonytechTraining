export const fetchLoginUser = (data) => {
  return {
    type: "loginUser/fetchLoginUser",
    payload: data,
  };
};
