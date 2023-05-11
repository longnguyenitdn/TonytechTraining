import { IUser } from "@/types/user.type";
import { myFetch } from "./myFetch";

const getUser = () => {
  return myFetch("/users", "GET");
};

const getUserById = (id: number) => {
  return myFetch(`/users/${id}`, "GET");
};
const getUserByEmail = (email: string) => {
  return myFetch(`/users?email=${email}`, "GET");
};

const getUserLogin = (email: string, pass: string) => {
  return myFetch(`/users?email=${email}&pass=${pass}`, "GET");
};

const addUser = (user: IUser) => {
  const link = "/users";
  const option = "POST";
  return myFetch(link, option, user);
};

const editUser = (user: { id: number }) => {
  let link = `/users/${user.id}`;
  let method = "PUT";
  return myFetch(link, method, user);
};

const deleteUser = (id: number) => {
  const link = `/users/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};

export {
  addUser,
  editUser,
  deleteUser,
  getUser,
  getUserById,
  getUserLogin,
  getUserByEmail,
};
