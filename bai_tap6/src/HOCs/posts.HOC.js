import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPost } from "../api/post";
import { fetchPost } from "../redux/actions/post.action";

export const withPosts = (WrappedComponent) => {
  const HigherComponent = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const removePass = (obj) => {
      const { pass, ...rest } = obj;
      return rest;
    };
    useEffect(() => {
      getPost().then((posts) => {
        const newPosts = posts.reverse().map((post) => {
          if (post) {
            return { ...post, user: removePass(post.user) };
          }
          return post;
        });
        dispatch(fetchPost(newPosts));
        setData(newPosts);
      });
    }, [dispatch]);
    return <WrappedComponent posts={data} {...props} />;
  };
  return HigherComponent;
};
