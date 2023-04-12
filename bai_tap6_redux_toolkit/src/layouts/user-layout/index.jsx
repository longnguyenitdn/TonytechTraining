import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";
import { withUser } from "../../HOCs/user.Hocs";
import UserHeader from "../../modules/user-header";

const UserLayout = () => {
  const navigate = useNavigate();
  const transferToHome = () => {
    navigate(ROUTER.home);
  };

  return (
    <div className="user-layout">
      <div className="user-layout-cover-header">
        <div className="user-layout-header flexr flex-bet flex-cen">
          <img src="/logo5.png" alt="Loading" onClick={transferToHome} />
          <UserHeader />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default withUser(UserLayout);
