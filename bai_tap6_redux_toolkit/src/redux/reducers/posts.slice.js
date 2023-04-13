import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPostPublic,
  fetchPostUpdate,
  fetchUserPostByUser,
} from "../actions/post.action";
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    userPosts: [],
    publicPosts: [],
    post: {},
  },
  reducers: {
    userAddPost: (state, action) => {
      state.userPosts.push(action.payload);
    },

    userRemovePost: (state, action) => {
      state.userPosts = state.userPosts.filter(
        (post) => post.id !== action.payload
      );
    },
    userUpdatePost: (state, action) => {
      state.userPosts = state.userPosts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostPublic.pending, (state, action) => {
        state.publicPosts = [];
      })
      .addCase(fetchPostPublic.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.publicPosts = [];
        } else {
          state.publicPosts = action.payload.posts.reverse();
        }
      })
      .addCase(fetchPostUpdate.pending, (state, action) => {
        state.post = {};
      })
      .addCase(fetchPostUpdate.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.post = {};
        } else {
          state.post = action.payload.post;
        }
      })
      .addCase(fetchUserPostByUser.pending, (state, action) => {
        state.userPosts = [];
      })
      .addCase(fetchUserPostByUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.userPosts = [];
        } else {
          state.userPosts = action.payload.posts.reverse();
        }
      });
  },
});
export const { userAddPost, userRemovePost, userUpdatePost } =
  postsSlice.actions;
export default postsSlice.reducer;
