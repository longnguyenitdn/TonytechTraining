import { combineReducers } from "redux";
import posts from "./reducers/posts.reducer";

import loginUser from "./reducers/loginUser.reducer";

export default combineReducers({
  posts,

  loginUser,
});
