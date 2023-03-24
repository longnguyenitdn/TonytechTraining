import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../../components/post";
import { postsSelector } from "../../redux/selectors/post.selector";

const UserVisitedPage = () => {
  const posts = useSelector(postsSelector);
  const userId = window.localStorage.getItem("id");
  const postUser = posts.find((post) => post.userId === parseInt(userId));
  const { visitedUserId } = useParams();
  const filterPosts = posts.filter(
    (post) => post.userId === parseInt(visitedUserId)
  );
  const postVisited = posts.find(
    (post) => post.userId === parseInt(visitedUserId)
  );

  return (
    <div className="user-home">
      <div className="user-title">
        <h3>Xin chào {postUser?.user.name}</h3>
        <h5>Đây là những bài viết {postVisited?.user.name} đã đăng:</h5>
      </div>
      <div className="user-content flexc flex-cen">
        {filterPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default UserVisitedPage;
