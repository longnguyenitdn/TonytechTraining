import { combineReducers } from "redux";
import posts from "./reducers/posts.reducer";

import loginUser from "./reducers/loginUser.reducer";
import settingLoading from "./reducers/setting.reducer";

export default combineReducers({
  posts,
  settingLoading,
  loginUser,
});
