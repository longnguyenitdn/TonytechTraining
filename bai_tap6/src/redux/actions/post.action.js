import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPostToUpdate,
  getUserPost,
} from "../../api/post";
import {
  POSTS_ADDPOST,
  POSTS_FETCHPOST,
  POSTS_FETCHUSERPOST,
  POSTS_REMOVEPOST,
  POSTS_SETPOST,
  POSTS_UPDATEPOST,
} from "../constant/posts.constant";
import { setLoading } from "./setting.action";

export const addNewPost = (data) => {
  return {
    type: POSTS_ADDPOST,
    payload: data,
  };
};
export const addNewByPost = (post) => {
  return async (dispatch) => {
    let reponse = {};
    try {
      dispatch(setLoading(true));
      const res = await addPost(post);
      dispatch(addNewPost(res));
      reponse = {
        error: false,
      };
    } catch (err) {
      console.log(err);
      reponse = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return reponse;
  };
};

export const removePost = (data) => {
  return {
    type: POSTS_REMOVEPOST,
    payload: data,
  };
};

export const removePostById = (postId) => {
  return async (dispatch) => {
    let reponse = {};
    try {
      dispatch(setLoading(true));
      await deletePost(postId);
      dispatch(removePost(postId));
      reponse = {
        error: false,
      };
    } catch (err) {
      console.log(err);
      reponse = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return reponse;
  };
};

export const updatePost = (data) => {
  return {
    type: POSTS_UPDATEPOST,
    payload: data,
  };
};

export const updateByPost = (post) => {
  return async (dispatch) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const res = await editPost(post);
      dispatch(updatePost(res));
      response = {
        error: false,
      };
    } catch (err) {
      console.log(err);
      response = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return response;
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
    type: POSTS_FETCHPOST,
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
    type: POSTS_SETPOST,
    payload: data,
  };
};
export const fetchUserPost = (data) => {
  return {
    type: POSTS_FETCHUSERPOST,
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
