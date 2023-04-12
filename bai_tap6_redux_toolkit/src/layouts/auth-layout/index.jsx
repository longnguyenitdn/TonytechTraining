import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";

const AuthLayout = () => {
  const navigate = useNavigate();

  const transferToHome = () => {
    navigate(ROUTER.home);
  };
  return (
    <div className="full-view base-layout">
      <img src="/logo.png" alt="Loading" onClick={transferToHome} />
      <Outlet />
    </div>
  );
};
export default AuthLayout;
