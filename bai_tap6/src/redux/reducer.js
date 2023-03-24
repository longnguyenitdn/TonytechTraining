import { combineReducers } from "redux";
import posts from "./reducers/posts.reducer";
import users from "./reducers/users.reducer";

export default combineReducers({
  posts,
  users,
});
