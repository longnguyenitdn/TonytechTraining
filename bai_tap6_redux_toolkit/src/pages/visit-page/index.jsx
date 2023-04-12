import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../../components/post";

import { fetchVisitUserById } from "../../redux/actions/visitUser.action";
import { postsUserSelector } from "../../redux/selectors/post.selector";
import { visitUserSelector } from "../../redux/selectors/visitUser.selector";

const VisitedPage = () => {
  const visitPosts = useSelector(postsUserSelector);
  const visitUser = useSelector(visitUserSelector);
  const [isExistUser, setIsExistUser] = useState(undefined);
  const loginUserName = window.localStorage.getItem("name");
  const { visitedUserId } = useParams();
  const dispatch = useDispatch();

  const getPostVisitUser = async () => {
    const reponse = await dispatch(fetchVisitUserById(visitedUserId));
    if (reponse.payload.error) {
      setIsExistUser(false);
    } else {
      setIsExistUser(true);
    }
  };
  useEffect(() => {
    getPostVisitUser();
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
          <h5>Đây là những bài viết {visitUser?.name} đã đăng:</h5>
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
