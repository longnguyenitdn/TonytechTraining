import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPostToUpdate,
  getUserPost,
} from "../../api/post";
import { setLoading } from "./setting.action";

export const addNewPost = (data) => {
  return {
    type: "posts/addPost",
    payload: data,
  };
};
export const addNewByPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await addPost(post);

      dispatch(addNewPost(res));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};

export const removePost = (data) => {
  return {
    type: "posts/removePost",
    payload: data,
  };
};

export const removePostById = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deletePost(postId);

      dispatch(removePost(postId));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};

export const updatePost = (data) => {
  return {
    type: "posts/updatePost",
    payload: data,
  };
};

export const updateByPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await editPost(post);
      dispatch(updatePost(res));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};

export const fetchPostUpdate = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await getPostToUpdate(postId);

      dispatch(setPostTemp(res));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};

export const fetchPost = (data) => {
  return {
    type: "posts/fetchPost",
    payload: data,
  };
};

export const fetchPostPublic = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await getPost();
      dispatch(fetchPost(res.reverse()));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};

export const setPostTemp = (data) => {
  return {
    type: "posts/setPost",
    payload: data,
  };
};
export const fetchUserPost = (data) => {
  return {
    type: "posts/fetchUserPost",
    payload: data,
  };
};
export const fetchUserPostByUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await getUserPost(userId);
      dispatch(fetchUserPost(res.reverse()));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  };
};
