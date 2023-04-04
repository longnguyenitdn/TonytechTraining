import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LogInForm from "../../components/log-in-form";
import { fetchLoginUserByAuth } from "../../redux/actions/loginUser.action";

import { ROUTER } from "../../config/routers";
import { getUserLogin } from "../../api/user";

const LogInPage = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLoginingUser = (id, name) => {
    window.localStorage.clear();
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("name", name);
  };
  const onSubmitGetUser = async (acc, pass) => {
    const users = await getUserLogin(acc, pass);
    if (users[0]) {
      dispatch(fetchLoginUserByAuth(users[0]));
      setLoginingUser(users[0].id, users[0].name);
      navigate(ROUTER.home);
    } else {
      setIsSuccess(false);
    }
  };
  return (
    <div className="flexc base-layout-cover">
      <LogInForm onSubmitGetUser={onSubmitGetUser} isSuccess={isSuccess} />
    </div>
  );
};
export default LogInPage;
