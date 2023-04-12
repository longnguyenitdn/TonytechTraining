import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loading from "../components/loading";
import { ROUTER } from "../config/routers";
import { getUserLoginLocal } from "../redux/actions/user.action";

export const withUser = (WrappedComponent) => {
  const HigherComponent = (props) => {
    const navigate = useNavigate();
    const id = window.localStorage.getItem("id");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const checkUserLogin = async (id) => {
      setIsLoading(true);
      const res = await dispatch(getUserLoginLocal(id));
      if (res.payload.error) {
        navigate(ROUTER.userLogin);
      }
      setIsLoading(false);
    };
    useEffect(() => {
      if (id) {
        checkUserLogin(id);
      } else {
        navigate(ROUTER.userLogin);
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return isLoading ? <Loading /> : <WrappedComponent {...props} />;
  };
  return HigherComponent;
};
