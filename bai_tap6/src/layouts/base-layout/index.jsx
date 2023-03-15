import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="full-view base-layout">
      <img src="/logo.png" alt="Loading" />
      <Outlet />
    </div>
  );
};
export default BaseLayout;
