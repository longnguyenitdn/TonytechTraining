export default function visitUser(state = {}, action) {
  switch (action.type) {
    case "visitUser/fetchVisitUser":
      return action.payload;

    default:
      return state;
  }
}
