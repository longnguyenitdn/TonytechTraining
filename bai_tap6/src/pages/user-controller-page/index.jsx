import React from "react";
import UserController from "../../components/user-controller";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usersSelector } from "../../redux/selectors";
const UserControllerPage = () => {
  const users = useSelector(usersSelector);
  const { userId } = useParams();
  const user = users.find((user) => user.id === parseInt(userId));
  return <UserController user={user} />;
};
export default UserControllerPage;
