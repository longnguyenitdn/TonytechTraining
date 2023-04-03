import { myFetch } from "./myFetch";

const getUser = () => {
  return myFetch("/users", "GET");
};
const getUserToCheck = (id) => {
  return myFetch(`/users/${id}`, "GET");
};
const addUser = (user) => {
  const link = "/users";
  const option = "POST";
  return myFetch(link, option, user);
};
const editUser = (user) => {
  let link = `/users/${user.id}`;
  let method = "PUT";
  return myFetch(link, method, user);
};
const deleteUser = (id) => {
  const link = `/users/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export { addUser, editUser, deleteUser, getUser, getUserToCheck };
