import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../api/user";
import { fetchUser } from "../redux/actions/user.action";

export const withUsers = (WrappedComponent) => {
  const HigherComponent = (props) => {
    const userId = window.localStorage.getItem("id");

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    useEffect(() => {
      getUser().then((users) => {
        const UsersWithoutPass = users.map((user) => {
          const { pass, ...rest } = user;
          return rest;
        });
        const loginUser = UsersWithoutPass.find(
          (user) => user.id === parseInt(userId)
        );

        dispatch(fetchUser(loginUser));
        setData(loginUser);
      });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return <WrappedComponent user={data} {...props} />;
  };
  return HigherComponent;
};
