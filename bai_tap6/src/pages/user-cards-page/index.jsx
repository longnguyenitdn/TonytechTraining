import React from "react";
import UserCard from "../../components/user-card";
import { Link } from "react-router-dom";
import { ROUTER, getRouter } from "../../config/routers";
import { useParams } from "react-router-dom";

import {
  HomeFilled,
  SearchOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

const UserCardsPage = () => {
  const { userId } = useParams();
  const userAddLink = getRouter(ROUTER.userAdd, {
    userId: userId,
  });
  return (
    <>
      <div className="user-layout-cover-body">
        <div className="user-layout-body">
          <div className="user-layout-body-content">
            <div className="user-cards flexc">
              <UserCard />
              <UserCard />
              <UserCard />
            </div>
          </div>
        </div>
      </div>
      <div className="user-layout-cover-footer">
        <div className="user-layout-footer flexr flex-cen flex-around">
          <button>
            <HomeFilled className="user-layout-footer-icon" />
          </button>
          <button>
            <Link to={userAddLink}>
              <PlusSquareOutlined className="user-layout-footer-icon" />
            </Link>
          </button>
          <button>
            <SearchOutlined className="user-layout-footer-icon" />
          </button>
        </div>
      </div>
    </>
  );
};
export default UserCardsPage;
