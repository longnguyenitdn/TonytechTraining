import React from "react";
import Post from "../../components/post";
import { withPosts } from "../../HOCs/posts.HOC";

const HomePage = (props) => {
  return (
    <>
      <div className="user-layout-cover-body">
        <div className="user-layout-body">
          <div className="user-layout-body-content">
            <div className="user-cards flexc">
              {props.posts?.map((post) => {
                return <Post key={post.id} post={post} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withPosts(HomePage);
