import React from "react";
import { useParams } from "react-router-dom";
import { getRouter, ROUTER } from "../../config/routers";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { editPost } from "../../api/post";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserPostForm from "../../components/user-post-form";
import { useSelector } from "react-redux";
import { postsUserSelector } from "../../redux/selectors/post.selector";
import { updatePost } from "../../redux/actions/post.action";

const UserUpdatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(postsUserSelector);
  const userId = window.localStorage.getItem("id");
  const { postId } = useParams();
  const userLink = getRouter(ROUTER.userHome, {
    userId: userId,
  });
  const post = posts.find((post) => post.id === parseInt(postId));

  const handleUpdatePost = (post) => {
    editPost(post)
      .then((data) => {
        dispatch(updatePost(data));
        navigate(ROUTER.userHome);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-new-card">
      <div className="user-new-card-cover">
        <h3>Chỉnh sửa bài viết</h3>
        <div className="user-new-card-content flexc flex-cen flex-bet">
          <UserPostForm
            post={post}
            userId={userId}
            handleUpdatePost={handleUpdatePost}
          />
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
export default UserUpdatePage;
