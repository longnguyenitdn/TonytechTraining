export const addNewUser = (data) => {
  return {
    type: "users/addUser",
    payload: data,
  };
};

export const fetchData = (data) => {
  return {
    type: "users/fetchData",
    payload: data,
  };
};
