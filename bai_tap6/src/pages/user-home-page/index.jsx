import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../../components/post";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "../../config/routers";
import {
  HomeFilled,
  SearchOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import { deletePost, getUserPost } from "../../api/post";
import { fetchUserPost, removePost } from "../../redux/actions/post.action";
import { usersSelector } from "../../redux/selectors/user.selector";
import { postsUserSelector } from "../../redux/selectors/post.selector";
import { removePass } from "../../ultil";

const UserHomePage = (props) => {
  const userId = window.localStorage.getItem("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(usersSelector);
  const posts = useSelector(postsUserSelector);

  const handleRemovePost = (id) => {
    deletePost(id)
      .then(() => {
        dispatch(removePost(id));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userId) {
      navigate(ROUTER.userHome);
    } else {
      navigate(ROUTER.userLogin);
    }
    getUserPost(userId).then((posts) => {
      dispatch(
        fetchUserPost(
          posts.map((post) => ({
            ...post,
            user: removePass(post.user),
          }))
        )
      );
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="user-home">
      <div className="user-title">
        <h3>Xin chào {user?.name}</h3>
        <h5>Đây là những bài viết bạn đã đăng:</h5>
      </div>
      <div className="user-content flexc flex-cen">
        {posts
          ?.filter((post) => post.userId === parseInt(userId))
          .map((post) => (
            <Post
              key={post.id}
              post={post}
              optionStatus={true}
              user={user}
              handleRemovePost={handleRemovePost}
            />
          ))}
      </div>
      <div className="user-layout-cover-footer">
        <div className="user-layout-footer flexr flex-cen flex-around">
          <button>
            <HomeFilled className="user-layout-footer-icon" />
          </button>
          <button>
            <Link to={ROUTER.userAdd}>
              <PlusSquareOutlined className="user-layout-footer-icon" />
            </Link>
          </button>
          <button>
            <SearchOutlined className="user-layout-footer-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserHomePage;
