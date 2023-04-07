import { FETCH_LOGIN_USER } from "../constant/authUser.constant";
import { VISITUSER_SETVISITUSER } from "../constant/visitUser.constant";

export default function user(
  state = {
    visitUser: {},
    loginUser: {},
  },
  action
) {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return { ...state, loginUser: action.payload };
    case VISITUSER_SETVISITUSER:
      return { ...state, visitUser: action.payload };

    default:
      return state;
  }
}
