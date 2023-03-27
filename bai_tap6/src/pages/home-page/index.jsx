import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../api/post";
import Post from "../../components/post";
import { fetchPost } from "../../redux/actions/post.action";
import { postsSelector } from "../../redux/selectors/post.selector";

const HomePage = (props) => {
  const posts = useSelector(postsSelector);

  const disPatch = useDispatch();
  useEffect(() => {
    getPost().then((posts) => {
      disPatch(fetchPost(posts));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="user-layout-cover-body">
        <div className="user-layout-body">
          <div className="user-layout-body-content">
            <div className="user-cards flexc">
              {posts?.map((post) => {
                return <Post key={post.id} post={post} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
