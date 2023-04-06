import { VISITUSER_FETCHVISITUSER } from "../constant/visitUser.constant";

export default function visitUser(state = {}, action) {
  switch (action.type) {
    case VISITUSER_FETCHVISITUSER:
      return action.payload;

    default:
      return state;
  }
}
