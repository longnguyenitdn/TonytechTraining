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
  FETCH_POST_PUBLIC,
  FETCH_POST_UPDATE,
  FETCH_USER_POST_BY_USER,
  REMOVE_POST_BY_ID,
  UPDATE_BY_POST,
} from "../constant/posts.constant";
import { setLoading } from "../reducers/setting.slice";
import {
  userUpdatePost,
  userAddPost,
  userRemovePost,
} from "../reducers/posts.slice";

export const addNewByPost = createAsyncThunk(
  ADD_NEW_BY_POST,
  async (post, { dispatch }) => {
    let reponse = {};
    try {
      dispatch(setLoading(true));
      const res = await addPost(post);
      dispatch(userAddPost(res));
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

export const removePostById = createAsyncThunk(
  REMOVE_POST_BY_ID,
  async (postId, { dispatch }) => {
    let reponse = {};
    try {
      dispatch(setLoading(true));
      await deletePost(postId);
      dispatch(userRemovePost(postId));
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

export const updateByPost = createAsyncThunk(
  UPDATE_BY_POST,
  async (post, { dispatch }) => {
    let response = {};
    try {
      dispatch(setLoading(true));
      const res = await editPost(post);
      dispatch(userUpdatePost(res));
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
    let res = {};
    try {
      dispatch(setLoading(true));
      const post = await getPostToUpdate(postId);
      res = {
        error: false,
        post: post,
      };
    } catch (err) {
      console.log(err);
      res = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const fetchPostPublic = createAsyncThunk(
  FETCH_POST_PUBLIC,
  async (_, { dispatch }) => {
    let res = {};
    try {
      dispatch(setLoading(true));
      const posts = await getPost();
      res = {
        error: false,
        posts: posts,
      };
    } catch (err) {
      console.log(err);
      res = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return res;
  }
);

export const fetchUserPostByUser = createAsyncThunk(
  FETCH_USER_POST_BY_USER,
  async (userId, { dispatch }) => {
    let res = {};
    try {
      dispatch(setLoading(true));
      const posts = await getUserPost(userId);
      res = {
        posts: posts,
        error: false,
      };
    } catch (err) {
      console.log(err);
      res = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return res;
  }
);
