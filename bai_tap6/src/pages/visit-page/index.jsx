import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPost } from "../../api/post";
import { getUser } from "../../api/user";
import Post from "../../components/post";

const VisitedPage = () => {
  const [visitPosts, setVisitPosts] = useState([]);
  const [isExistUser, setIsExistUser] = useState();
  const loginUserName = window.localStorage.getItem("name");
  const { visitedUserId } = useParams();
  const postVisited = visitPosts.find(
    (post) => post.userId === parseInt(visitedUserId)
  );
  const validUser = async () => {
    let isExist = false;
    await getUser().then((data) => {
      isExist = data.some((item) => item.id === parseInt(visitedUserId));
    });
    return isExist;
  };
  useEffect(() => {
    validUser().then((data) => {
      if (data) {
        setIsExistUser(true);
        getUserPost(visitedUserId).then((posts) => {
          setVisitPosts(posts.reverse());
        });
      } else {
        setIsExistUser(false);
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
