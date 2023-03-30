import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRouter, ROUTER } from "../../config/routers";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { editPost, getUserPost } from "../../api/post";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserPostForm from "../../components/user-post-form";
import { useSelector } from "react-redux";
import { postsUserSelector } from "../../redux/selectors/post.selector";
import { fetchUserPost, updatePost } from "../../redux/actions/post.action";
import { loginUserSelector } from "../../redux/selectors/loginUserSelector";

const UserUpdatePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(postsUserSelector);
  const loginUser = useSelector(loginUserSelector);
  const { postId } = useParams();
  const userLink = getRouter(ROUTER.userHome, {
    userId: loginUser.id,
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

  useEffect(() => {
    if (loginUser.id) {
      getUserPost(loginUser.id).then((posts) => {
        dispatch(fetchUserPost(posts.reverse()));
      });
    }
  }, [loginUser.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="user-new-card">
      <div className="user-new-card-cover">
        <h3>Chỉnh sửa bài viết</h3>
        <div className="user-new-card-content flexc flex-cen flex-bet">
          <UserPostForm
            post={post}
            userId={loginUser.id}
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
export default UserUpdatePostPage;
