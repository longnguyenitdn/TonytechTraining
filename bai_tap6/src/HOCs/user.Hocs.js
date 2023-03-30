import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { ROUTER } from "../config/routers";
import { fetchLoginUser } from "../redux/actions/loginUser.action";

export const withUser = (WrappedComponent) => {
  const HigherComponent = (props) => {
    const navigate = useNavigate();
    const id = window.localStorage.getItem("id");
    const name = window.localStorage.getItem("name");
    const userLogin = { id, name };
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
      setIsLoading(true);
      if (id) {
        dispatch(fetchLoginUser(userLogin));
      } else {
        navigate(ROUTER.userLogin);
      }
      setIsLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return isLoading ? <Loading /> : <WrappedComponent {...props} />;
  };
  return HigherComponent;
};
