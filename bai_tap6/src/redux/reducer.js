import { combineReducers } from "redux";
import posts from "./reducers/posts.reducer";

import user from "./reducers/user.reducer";
import settingLoading from "./reducers/setting.reducer";

export default combineReducers({
  posts,
  settingLoading,
  user,
});
