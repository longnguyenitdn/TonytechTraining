import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPostToUpdate,
  getUserPost,
} from "../../api/post";
import {
  ADD_NEW_BY_POST,
  ADD_POST,
  FETCH_POST,
  FETCH_POST_PUBLIC,
  FETCH_POST_UPDATE,
  FETCH_USER_POST,
  FETCH_USER_POST_BY_USER,
  REMOVE_POST,
  REMOVE_POST_BY_ID,
  UPDATE_BY_POST,
  UPDATE_POST,
} from "../constant/posts.constant";
import { setLoading } from "../reducers/setting.slice";
import { setPost } from "../reducers/posts.slice";

export const addNewPost = (data) => {
  return {
    type: ADD_POST,
    payload: data,
  };
};
export const addNewByPost = createAsyncThunk(
  ADD_NEW_BY_POST,
  async (post, { dispatch }) => {
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
  }
);

export const removePost = (data) => {
  return {
    type: REMOVE_POST,
    payload: data,
  };
};

export const removePostById = createAsyncThunk(
  REMOVE_POST_BY_ID,
  async (postId, { dispatch }) => {
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
  }
);

export const updatePost = (data) => {
  return {
    type: UPDATE_POST,
    payload: data,
  };
};

export const updateByPost = createAsyncThunk(
  UPDATE_BY_POST,
  async (post, { dispatch }) => {
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
  }
);

export const fetchPostUpdate = createAsyncThunk(
  FETCH_POST_UPDATE,
  async (postId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await getPostToUpdate(postId);

      dispatch(setPost(res));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  }
);
export const fetchPost = (data) => {
  return {
    type: FETCH_POST,
    payload: data,
  };
};

export const fetchPostPublic = createAsyncThunk(
  FETCH_POST_PUBLIC,
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await getPost();
      dispatch(fetchPost(res.reverse()));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  }
);

export const fetchUserPost = (data) => {
  return {
    type: FETCH_USER_POST,
    payload: data,
  };
};

export const fetchUserPostByUser = createAsyncThunk(
  FETCH_USER_POST_BY_USER,
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await getUserPost(userId);

      dispatch(fetchUserPost(res.reverse()));
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  }
);
