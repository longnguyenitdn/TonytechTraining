import React from "react";
import UserControllerPage from "../../pages/user-controller-page";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <div className="user-layout-cover-header">
        <div className="user-layout-header flexr flex-bet flex-cen">
          <img src="/logo5.png" alt="Loading" />
          <UserControllerPage />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default UserLayout;
