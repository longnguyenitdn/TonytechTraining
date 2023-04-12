import { createSlice } from "@reduxjs/toolkit";
import {
  addNewByPost,
  fetchPostUpdate,
  removePostById,
  updateByPost,
} from "../actions/post.action";
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "",
    userPosts: [],
    publicPosts: [],
    post: {},
  },
  reducers: {
    addPost: (state, action) => {
      state.userPosts.push(action.payload);
    },
    fetchPost: (state, action) => {
      state.publicPosts = action.payload;
    },
    fetchUserPost: (state, action) => {
      state.userPosts = action.payload;
    },
    removePost: (state, action) => {
      state.userPosts = state.userPosts.filter(
        (post) => post.id !== action.payload
      );
    },
    updatePost: (state, action) => {
      state.userPosts = state.userPosts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewByPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewByPost.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(removePostById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removePostById.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateByPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateByPost.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(fetchPostUpdate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPostUpdate.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});
export const {
  addPost,
  fetchPost,
  fetchUserPost,
  removePost,
  updatePost,
  setPost,
} = postsSlice.actions;
export default postsSlice.reducer;
