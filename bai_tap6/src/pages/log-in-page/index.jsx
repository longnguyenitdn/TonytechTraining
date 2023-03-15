import React from "react";
import { Outlet } from "react-router-dom";

const LogInPage = () => {
  return (
    <div className="flexc base-layout-cover">
      <Outlet />
    </div>
  );
};
export default LogInPage;
