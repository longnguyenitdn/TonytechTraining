export default function loginUser(state = {}, action) {
  switch (action.type) {
    case "loginUser/fetchLoginUser":
      return action.payload;

    default:
      return state;
  }
}
