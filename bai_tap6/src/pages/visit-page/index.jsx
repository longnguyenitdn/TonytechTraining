import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../../components/post";
import { fetchUserPostByUser } from "../../redux/actions/post.action";

import { fetchVisitUserById } from "../../redux/actions/visitUser.action";
import { postsUserSelector } from "../../redux/selectors/post.selector";

const VisitedPage = () => {
  const visitPosts = useSelector(postsUserSelector);
  const [isExistUser, setIsExistUser] = useState(undefined);
  const loginUserName = window.localStorage.getItem("name");
  const { visitedUserId } = useParams();
  const dispatch = useDispatch();
  const postVisited = visitPosts.find(
    (post) => post.userId === parseInt(visitedUserId)
  );
  const checkExistVisitUser = async () => {
    const reponse = await dispatch(fetchVisitUserById(visitedUserId));
    if (Object.keys(reponse).length === 0) {
      setIsExistUser(false);
    } else {
      setIsExistUser(true);
      await dispatch(fetchUserPostByUser(visitedUserId));
    }
  };
  useEffect(() => {
    checkExistVisitUser();
  }, [visitedUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  return typeof isExistUser === "undefined" ? (
    <></>
  ) : (
    <>
      <h1 className="not-found" hidden={isExistUser}>
        Không tồn tại tài khoản này
      </h1>
      <div hidden={!isExistUser} className="user-home">
        <div className="user-title">
          <h3>Xin chào {loginUserName ? loginUserName : "người lạ"}</h3>
          <h5>Đây là những bài viết {postVisited?.user?.name} đã đăng:</h5>
        </div>
        <div className="user-content flexc flex-cen">
          {visitPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};
export default VisitedPage;
