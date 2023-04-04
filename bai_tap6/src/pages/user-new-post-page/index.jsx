import React from "react";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ROUTER } from "../../config/routers";
import { useDispatch } from "react-redux";

import { addNewByPost } from "../../redux/actions/post.action";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import UserPostForm from "../../components/user-post-form";

const UserNewPostPage = () => {
  const navigate = useNavigate();

  const userId = window.localStorage.getItem("id");
  const dispatch = useDispatch();

  const handleAddpost = (post) => {
    dispatch(addNewByPost(post));
    navigate(ROUTER.userHome);
  };
  return (
    <div className="user-new-card">
      <div className="user-new-card-cover">
        <h3>Tạo bài viết mới</h3>
        <div className="user-new-card-content flexc flex-cen flex-bet">
          <UserPostForm userId={userId} handleAddpost={handleAddpost} />
        </div>
      </div>
      <button className="btn-new-back">
        <Link to={ROUTER.userHome}>
          <ArrowLeftOutlined />
        </Link>
      </button>
    </div>
  );
};
export default UserNewPostPage;
