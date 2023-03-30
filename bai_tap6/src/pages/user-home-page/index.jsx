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
import { postsUserSelector } from "../../redux/selectors/post.selector";
import { loginUserSelector } from "../../redux/selectors/loginUserSelector";
import { getUser } from "../../api/user";

const UserHomePage = (props) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(loginUserSelector);

  const posts = useSelector(postsUserSelector);
  const navigate = useNavigate();
  const handleRemovePost = (id) => {
    deletePost(id)
      .then(() => {
        dispatch(removePost(id));
      })
      .catch((error) => console.log(error));
  };
  const validUser = async () => {
    let isExist = false;
    await getUser().then((data) => {
      isExist = data.some((item) => item.id === parseInt(loginUser.id));
    });
    return isExist;
  };
  useEffect(() => {
    if (loginUser.id) {
      validUser().then((data) => {
        if (data) {
          getUserPost(loginUser.id).then((posts) => {
            dispatch(fetchUserPost(posts.reverse()));
          });
        } else {
          window.localStorage.clear();
          navigate(ROUTER.userLogin);
        }
      });
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
