import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRouter, ROUTER } from "../../config/routers";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import UserPostForm from "../../components/user-post-form";
import { useSelector } from "react-redux";
import { fetchPostUpdate, updateByPost } from "../../redux/actions/post.action";
import { loginUserSelector } from "../../redux/selectors/loginUserSelector";
import { postSelector } from "../../redux/selectors/post.selector";

const UserUpdatePostPage = () => {
  const dispatch = useDispatch();

  const loginUser = useSelector(loginUserSelector);
  const { postId } = useParams();
  const userLink = getRouter(ROUTER.userHome, {
    userId: loginUser.id,
  });

  const post = useSelector(postSelector);
  const setSuccessNotification = () =>
    toast("Update Successfull", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const setFailNotification = () =>
    toast.error("Update Fail, Opp!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleUpdatePost = async (post) => {
    const response = await dispatch(updateByPost(post));
    if (response.error) {
      setFailNotification();
    } else {
      setSuccessNotification();
    }
  };

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostUpdate(parseInt(postId)));
    }
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="user-new-card">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
