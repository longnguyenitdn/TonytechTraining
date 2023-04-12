import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import settingReducer from "./reducers/setting.slice";
import postsReducer from "./reducers/posts.slice";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    setting: settingReducer,
    user: userReducer,
  },
});
export default store;
