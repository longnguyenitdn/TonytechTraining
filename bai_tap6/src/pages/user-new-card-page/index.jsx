import React from "react";
import UserNewComponent from "../../components/user-new-component";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ROUTER, getRouter } from "../../config/routers";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserNewCardPage = () => {
  const { userId } = useParams();
  const userLink = getRouter(ROUTER.user, {
    userId: userId,
  });
  return (
    <div className="user-new-card">
      <div className="user-new-card-cover">
        <h3>Tạo bài viết mới</h3>
        <div className="user-new-card-content flexc flex-cen flex-bet">
          <textarea
            name="Text1"
            cols="40"
            rows="3"
            placeholder="Bạn đang nghĩ gì?"
          ></textarea>
          <UserNewComponent />
          <button>Đăng bài</button>
        </div>
      </div>
      <button className="btn-new-back">
        <Link to={userLink}>
          <ArrowLeftOutlined />
        </Link>
      </button>
    </div>
  );
};
export default UserNewCardPage;
