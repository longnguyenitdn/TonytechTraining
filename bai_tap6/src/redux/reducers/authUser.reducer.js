import { FETCH_LOGIN_USER } from "../constant/authUser.constant";

export default function loginUser(state = {}, action) {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return action.payload;

    default:
      return state;
  }
}
