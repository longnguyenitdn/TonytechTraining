import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { ROUTER } from "../../config/routers";
import UserController from "../../components/user-controller";

import { withUsers } from "../../HOCs/users.HOC";

const PublicLayout = (props) => {
  const navigate = useNavigate();

  const transferToHome = () => {
    navigate(ROUTER.home);
  };

  return (
    <div className="user-layout">
      <div className="user-layout-cover-header">
        <div className="user-layout-header flexr flex-bet flex-cen">
          <img src="/logo5.png" alt="Loading" onClick={transferToHome} />
          <UserController user={props.user} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default withUsers(PublicLayout);
