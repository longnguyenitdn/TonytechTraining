export const addNewUser = (data) => {
  return {
    type: "users/addUser",
    payload: data,
  };
};

export const fetchUser = (data) => {
  return {
    type: "users/fetchUser",
    payload: data,
  };
};
