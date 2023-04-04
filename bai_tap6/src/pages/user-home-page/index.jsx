import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/post";
import { Link } from "react-router-dom";
import { ROUTER } from "../../config/routers";
import {
  HomeFilled,
  SearchOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import {
  fetchUserPostByUser,
  removePostById,
} from "../../redux/actions/post.action";
import { postsUserSelector } from "../../redux/selectors/post.selector";
import { loginUserSelector } from "../../redux/selectors/loginUserSelector";

const UserHomePage = (props) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(loginUserSelector);

  const posts = useSelector(postsUserSelector);

  const handleRemovePost = (id) => {
    dispatch(removePostById(id));
  };

  useEffect(() => {
    if (loginUser.id) {
      dispatch(fetchUserPostByUser(loginUser.id));
    }
  }, [loginUser.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="user-home">
      <div className="user-title">
        <h3>Xin chào {loginUser.name}</h3>
        <h5>Đây là những bài viết bạn đã đăng:</h5>
      </div>
      <div className="user-content flexc flex-cen">
        {posts?.map((post) => (
          <Post
            key={post.id}
            post={post}
            optionStatus={true}
            handleRemovePost={handleRemovePost}
            loginUser={loginUser}
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
