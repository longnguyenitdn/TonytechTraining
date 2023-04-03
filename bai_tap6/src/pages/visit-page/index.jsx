import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPost } from "../../api/post";
import { getUserToCheck } from "../../api/user";
import Post from "../../components/post";

const VisitedPage = () => {
  const [visitPosts, setVisitPosts] = useState([]);
  const [isExistUser, setIsExistUser] = useState();
  const loginUserName = window.localStorage.getItem("name");
  const { visitedUserId } = useParams();
  const postVisited = visitPosts.find(
    (post) => post.userId === parseInt(visitedUserId)
  );

  useEffect(() => {
    getUserToCheck(visitedUserId).then((data) => {
      if (Object.keys(data).length === 0) {
        setIsExistUser(false);
      } else {
        setIsExistUser(true);
        getUserPost(visitedUserId).then((data) => {
          setVisitPosts(data);
        });
      }
    });
  }, [visitedUserId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
